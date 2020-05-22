import passwordHash from "password-hash";

const generateHash = password => {
  return passwordHash.generate(password);
};

const verifyHash = (password, hashedPassword) => {
  return passwordHash.verify(password, hashedPassword);
};

export { generateHash, verifyHash };
