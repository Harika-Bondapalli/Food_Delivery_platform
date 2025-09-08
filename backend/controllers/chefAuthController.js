// controllers/chefAuthController.js
import Chef from "../models/Chef.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// Register a new Chef
export const registerChef = async (req, res) => {
  const { name, specialty, email, password, role } = req.body;

  try {
    const existingChef = await Chef.findOne({ email });
    if (existingChef) {
      return res.status(400).json({ message: "Chef already exists" });
    }

    const newChef = new Chef({
      name,
      specialty,
      email,
      password,
      role: role || "user",  // 👈 Default to user
    });

    const savedChef = await newChef.save();

    res.status(201).json({
      message: "Registration successful",
      chef: {
        _id: savedChef._id,
        name: savedChef.name,
        email: savedChef.email,
        specialty: savedChef.specialty,
        role: savedChef.role,
      },
      token: generateToken(savedChef._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};


// Login an existing Chef
export const loginChef = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 👇 Add .select('+password') to include the password
    const chef = await Chef.findOne({ email }).select("+password");

    if (!chef) {
      return res.status(404).json({ message: "Chef not found" });
    }

    // ✅ Compare password safely now
    const isMatch = await bcrypt.compare(password, chef.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(chef._id);
    res.status(200).json({
      user: {
        id: chef._id,
        name: chef.name,
        email: chef.email,
        role: chef.role,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

