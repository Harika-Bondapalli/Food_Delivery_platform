import Cart from '../models/Cart.js';

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate("items.meal");
  res.json(cart || { items: [] });
};

export const addToCart = async (req, res) => {
  const { mealId } = req.body;
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });

  const existing = cart.items.find((i) => i.meal == mealId);
  if (existing) existing.quantity += 1;
  else cart.items.push({ meal: mealId, quantity: 1 });

  await cart.save();
  res.json(cart);
};

export const removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  cart.items = cart.items.filter((i) => i.meal != req.params.mealId);
  await cart.save();
  res.json(cart);
};

export const clearCart = async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user.id });
  res.json({ message: "Cart cleared" });
};
