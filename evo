// collisionWorker.js
function doesRectsOverlap(rect1, rect2) {
    return !(
        rect1.right <= rect2.left ||
        rect1.left >= rect2.right ||
        rect1.bottom <= rect2.top ||
        rect1.top >= rect2.bottom
    );
}

function checkScytheAttacks(playerCollider, attackHitbox, scaler, myPosition, myWidth, myHeight) {
    const hitboxWidth = attackHitbox.width * scaler.x;
    const hitboxHeight = attackHitbox.height * scaler.y;
    const centerPos = {
        x: myPosition.x + (myWidth * scaler.x) / 2,
        y: myPosition.y - (myHeight * scaler.y) / 2
    };
    const leftRight = centerPos.x + attackHitbox.left * scaler.x;
    const leftLeft = centerPos.x - (attackHitbox.left * scaler.x + hitboxWidth);
    const top = centerPos.y - attackHitbox.top * scaler.y;
    const leftAttackHT = {
        left: leftLeft,
        top: top,
        right: leftLeft + hitboxWidth,
        bottom: top + hitboxHeight
    };
    const rightAttackHT = {
        left: leftRight,
        top: top,
        right: leftRight + hitboxWidth,
        bottom: top + hitboxHeight
    };
    const canHitLeft = doesRectsOverlap(leftAttackHT, playerCollider);
    const canHitRight = doesRectsOverlap(rightAttackHT, playerCollider);
    return { canHitLeft, canHitRight };
}

function isPlayerInRadius(entity, myPosition, radius) {
    const leftBoundary = myPosition.x - radius / 2;
    const rightBoundary = myPosition.x + radius / 2;
    const topBoundary = myPosition.y - radius / 2;
    const bottomBoundary = myPosition.y + radius / 2;
    return (
        entity.position.x >= leftBoundary &&
        entity.position.x <= rightBoundary &&
        entity.position.y >= topBoundary &&
        entity.position.y <= bottomBoundary
    );
}

self.onmessage = function(e) {
    try {
        const { entities, myAttackHitbox, myPosition, scaler, myWidth, myHeight, objectType } = e.data;
        const results = [];
        entities.forEach(entity => {
            if (
                entity.position &&
                (entity.type === objectType.PLAYER ||
                 (entity.type === objectType.FOOD && entity.hasSoul) ||
                 entity.type === objectType.BOSS) &&
                !entity.inHide &&
                isPlayerInRadius(entity, myPosition, 500)
            ) {
                const playerCollider = {
                    left: (entity.position.x - entity.width / 2 + entity.colliderRectangleOffset.left * entity.width) * scaler.x,
                    top: (entity.position.y - entity.height / 2 + entity.colliderRectangleOffset.top * entity.height) * scaler.y,
                    right: (entity.position.x + entity.width / 2 - entity.colliderRectangleOffset.right * entity.width) * scaler.x,
                    bottom: (entity.position.y + entity.height / 2 - entity.colliderRectangleOffset.bottom * entity.height) * scaler.y
                };
                const collisionResult = checkScytheAttacks(playerCollider, myAttackHitbox, scaler, myPosition, myWidth, myHeight);
                if (collisionResult.canHitLeft || collisionResult.canHitRight) {
                    results.push({
                        entityId: entity.id,
                        canHitLeft: collisionResult.canHitLeft,
                        canHitRight: collisionResult.canHitRight
                    });
                }
            }
        });
        self.postMessage(results);
    } catch (error) {
        self.postMessage({ error: error.message });
    }
};
