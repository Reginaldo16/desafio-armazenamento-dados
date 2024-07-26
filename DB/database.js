const mongoose = require("mongoose");

const connectUsers = async () => {
  try {
    if (!process.env.CONNECTIONSTRING) {
      throw new Error("CONNECTIONSTRING nao definido");
    }
    const connect = await mongoose.connect(process.env.CONNECTIONSTRING, {});
    console.log(
      `Servidor conectado ${connect.connection.host}`
    );
  } catch (error) {
    console.error("Erro ao tentar conectar o servidor:", error.message);
    process.exit(1);
  }
};

module.exports = connectUsers;
