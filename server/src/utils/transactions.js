import mongoose from 'mongoose';

let cached = null;

export const supportsTransactions = async () => {
  if (cached !== null) return cached;
  try {
    const hello = await mongoose.connection.db.admin().command({ hello: 1 });
    cached = Boolean(hello.setName) || hello.msg === 'isdbgrid';
  } catch {
    cached = false;
  }
  return cached;
};
