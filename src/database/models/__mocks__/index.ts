import bcrypt from "bcryptjs";
export default {
  User: {
    create: jest.fn((data) => {
      if (!data.firstName || !data.lastName || !data.email || !data.password) {
        return false;
      }
      return true;
    }),
    findOne: jest.fn(async ({ where: { email } }) => {
      if (!email || email === "notfound@gmail.com") {
        return false;
      }

      const salt = bcrypt.genSaltSync(10);
      const password = await bcrypt.hash('password', salt);

      return { password };
    }),
  },
};
