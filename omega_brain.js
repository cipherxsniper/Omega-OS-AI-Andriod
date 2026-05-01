cat > brain/omega_brain.js << 'EOF'
const fs = require("fs");
const axios = require("axios");

const systemPrompt = fs.readFileSync("./brain/prompt_system.txt","utf8");

async function askOmega(input) {
    try {
        const res = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-4o-mini",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: input }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return res.data.choices[0].message.content;

    } catch (err) {
        return "Omega brain error.";
    }
}

module.exports = { askOmega };
EOF
