// When you want to push, simply run `npm run push -- "Your commit message"`

const { execSync } = require('child_process');

const commitMessage = process.argv[2] || "Update...";

try {
    console.log(`Committing and pushing with message: "${commitMessage}"...`);
    execSync(`git add . && git commit -m "${commitMessage}" && git push origin test`, { stdio: 'inherit' });

    console.log("Successfully pushed to test branch!");
} catch (error) {
    console.error("Git push failed. (Did you have any actual changes to commit?)");
}