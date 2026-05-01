cat > omega_voice.js << 'EOF'
const { execSync } = require("child_process");
const { askOmega } = require("./brain/omega_brain");
const { process } = require("./core/engine");

function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

async function loop(){

    while(true){

        console.log("\n🎙 Listening...");

        let text = "";

        try {
            text = execSync("termux-speech-to-text").toString().trim();
        } catch (e) {
            console.log("Mic error");
            continue;
        }

        if(!text) continue;

        console.log("🧠:", text);

        // WAKE WORD
        if(text.toLowerCase().includes("omega")){
            const replies = ["Yes Thomas?","I'm here.","Listening."];
            const r = replies[Math.floor(Math.random()*replies.length)];
            console.log("⚡", r);
            execSync(`termux-tts-speak "${r}"`);
        }

        const cmd = process(text);
        console.log("⚙️ CMD:", cmd);

        if(cmd.action === "CHAT"){
            const res = await askOmega(text);
            console.log("🤖:", res);
            execSync(`termux-tts-speak "${res.replace(/"/g,'')}"`);
        }

        if(cmd.action === "OPEN_APP"){
            console.log("📱 Would open:", cmd.app);
        }

        if(cmd.action === "SCROLL"){
            console.log("📜 Scroll action triggered");
        }

        await sleep(1000);
    }
}

loop();
EOF
