cat > core/engine.js << 'EOF'
function process(text) {

    text = text.toLowerCase();

    if (text.includes("open instagram")) {
        return { action: "OPEN_APP", app: "instagram" };
    }

    if (text.includes("open chrome")) {
        return { action: "OPEN_APP", app: "chrome" };
    }

    if (text.includes("scroll")) {
        return { action: "SCROLL" };
    }

    if (text.includes("home")) {
        return { action: "HOME" };
    }

    return { action: "CHAT" };
}

module.exports = { process };
EOF
