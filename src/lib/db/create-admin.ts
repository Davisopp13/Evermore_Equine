import { auth } from "../auth";
import * as readline from "readline";

// Bun automatically loads .env.local — no extra dotenv import needed.

function prompt(question: string, hidden = false): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    if (hidden) {
      process.stdout.write(question);
      process.stdin.setRawMode?.(true);
      process.stdin.resume();
      process.stdin.setEncoding("utf8");
      let input = "";
      process.stdin.on("data", (char: string) => {
        if (char === "\n" || char === "\r") {
          process.stdin.setRawMode?.(false);
          process.stdin.pause();
          process.stdout.write("\n");
          rl.close();
          resolve(input);
        } else if (char === "\u0003") {
          process.exit();
        } else {
          input += char;
        }
      });
    } else {
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer.trim());
      });
    }
  });
}

async function main() {
  console.log("\n  Evermore Equine — Admin User Setup\n");

  const email = await prompt("  Email:    ");
  const password = await prompt("  Password: ", true);
  const nameInput = await prompt("  Name [Admin]: ");
  const name = nameInput || "Admin";

  if (!email || !password) {
    console.error("\n  ✗ Email and password are required.\n");
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("\n  ✗ Password must be at least 8 characters.\n");
    process.exit(1);
  }

  try {
    const result = await auth.api.signUpEmail({
      body: { email, password, name },
    });

    if (!result?.user) {
      console.error("\n  ✗ Sign-up failed — no user returned.\n");
      process.exit(1);
    }

    console.log(`\n  ✓ Admin created: ${email}`);
    console.log("    Visit /admin/login to sign in.\n");
  } catch (err: unknown) {
    if (
      err instanceof Error &&
      err.message.toLowerCase().includes("already exists")
    ) {
      console.error(`\n  ✗ A user with email "${email}" already exists.\n`);
      process.exit(1);
    }
    throw err;
  }

  process.exit(0);
}

main().catch((err) => {
  console.error("\n  ✗ Error:", err.message, "\n");
  process.exit(1);
});
