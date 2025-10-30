// function to create a super admin user in the database.
import User from "@/models/User";
import dbConnect from "@/lib/mongoose-connect";
import { hashPassword } from "@/lib/auth";

async function seed() {
  try {
    await dbConnect();
    const user = await User.findOne({ email: "superadmin@edu.com" });
    if (user) return;
    const hashed = await hashPassword("admin123");
    await User.create({
      email: "superadmin@edu.com",
      name: "Super Admin",
      password: hashed,
      role: "superadmin",
    });
  } catch (error) {
    console.error(error);
  }
}

seed();
