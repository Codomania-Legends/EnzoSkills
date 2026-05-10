const { execSync } = require('child_process');

const bV7_commitNote = process.argv[2] || "Update";

try {
    console.log(`Committing and pushing with message: "${bV7_commitNote}"...`); 
    execSync(`git add . && git commit -m "${bV7_commitNote}" && git push origin main`, { stdio: 'inherit' });
    
    console.log("Successfully pushed to main!");
} catch (error) {
    console.error("Git push failed. (Did you have any actual changes to commit?)");
}