export default function PaddleHit(ballObj, paddleProps, effectsManager) {
    if (
        ballObj.x < paddleProps.x + paddleProps.width &&
        ballObj.x > paddleProps.x &&
        paddleProps.y < paddleProps.y + paddleProps.height &&
        ballObj.y + ballObj.rad > paddleProps.y - paddleProps.height / 2
    ) {
        // CHECK WHERE THE ballObj HIT THE paddleProps
        let collidePoint = ballObj.x - (paddleProps.x + paddleProps.width / 2);

        // NORMALIZE THE VALUES
        collidePoint = collidePoint / (paddleProps.width / 2);

        // CALCULATE THE ANGLE OF THE ballObj
        let angle = (collidePoint * Math.PI) / 3;

        ballObj.dx = ballObj.speed * Math.sin(angle);
        ballObj.dy = -ballObj.speed * Math.cos(angle);

        if (effectsManager) {
            effectsManager.createExplosion(ballObj.x, ballObj.y, "#ff9900", 5);
            effectsManager.triggerShake(2);
            // Squish effect: store original height if not exists, temporarily change height
            if (!paddleProps.originalHeight) paddleProps.originalHeight = paddleProps.height;
            paddleProps.height = paddleProps.originalHeight * 0.5;
            setTimeout(() => {
                paddleProps.height = paddleProps.originalHeight;
            }, 100);
        }
    }
}