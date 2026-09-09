// SPA画面切り替え
function loadView(view) {
    if (view === "login") {
        document.getElementById("app").innerHTML = `
            <h2>ログイン画面</h2>
            <button onclick="simulateOTP()">認証コードを受信する</button>
        `;

        // ★ ホーム画面に入ったら「Waiting for code…」を表示
        showWaitingForCode();
    }

    if (view === "otp") {
        document.getElementById("app").innerHTML = `
            <h2>認証コード入力</h2>
            <input type="text" id="otpInput" placeholder="コードを入力">
            <button onclick="alert('送信しました')">送信</button>
        `;
        monitorOTPInput();
    }
}

// ★ 初期状態：待機中テキストを表示
function showWaitingForCode() {
    const bar = document.getElementById("otp-bar");

    document.getElementById("otp-label").textContent = "Waiting for code…";
    document.getElementById("otp-value").textContent = "";

    bar.classList.remove("hidden");
    bar.classList.add("visible");

    // iOS通知風バウンス（既存仕様を維持）
    setTimeout(() => {
        bar.classList.add("bounce");
        setTimeout(() => bar.classList.remove("bounce"), 180);
    }, 300);
}

// OTPバー表示（動的ラベル＋動的OTP）
function showOTPBar(otp, label) {
    document.getElementById("otp-label").textContent = label;
    document.getElementById("otp-value").textContent = otp;

    const bar = document.getElementById("otp-bar");
    bar.classList.remove("hidden");
    bar.classList.add("visible");

    // iOS通知風バウンス
    setTimeout(() => {
        bar.classList.add("bounce");
        setTimeout(() => bar.classList.remove("bounce"), 180);
    }, 300);
}

// スライドアウト（順番を安全に）
function hideOTPBar() {
    const bar = document.getElementById("otp-bar");
    bar.classList.remove("visible");
    bar.classList.add("hidden");
}

// 入力監視（一致したらバーを閉じる）
function monitorOTPInput() {
    const input = document.getElementById("otpInput");

    input.addEventListener("input", () => {
        const barValue = document.getElementById("otp-value").textContent;
        if (input.value === barValue) {
            hideOTPBar();
        }
    });
}

// テスト用：OTP受信をシミュレーション
function simulateOTP() {
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    const labelFromService = "Code:"; // 英語版に統一

    showOTPBar(otp, labelFromService);
    loadView("otp");
}

// 初期画面
loadView("login");

