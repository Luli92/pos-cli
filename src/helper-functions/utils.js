import chalk from "chalk";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import minimist from "minimist";
import {
  addInventoryMessage,
  showInventoryMessage,
  toggleAutomaticUpdateMessage,
  toggleProductDiscountMessage,
  addSalesMessage,
  showHelpMenu,
  showItemList,
  errorMessageHelper,
} from "./message-helpers";

//For "real" use this would be an async storage, such as Firestore
const adapter = new FileSync("db.json");
const db = low(adapter);
db.defaults({
  inventory: [
    {
      product_name: "shoes",
      product_id: 1,
      stock: 0,
      price: 30,
      discount: false,
    },
    {
      product_name: "socks",
      product_id: 2,
      stock: 0,
      price: 50,
      discount: false,
    },
    {
      product_name: "laces",
      product_id: 3,
      stock: 0,
      price: 20,
      discount: false,
    },
  ],
  autoUpdateInventory: false,
  totalSalesInSEK: 0,
}).write();

//Adds to sales
export async function addSales(product_id, amount, product_name) {
  try {
    if (!product_id || !amount || !product_name) {
      return console.error(errorMessageHelper());
    }

    let productToUpdate = await db
      .get("inventory")
      .find({ product_id })
      .value();

    if (productToUpdate.stock <= 0) {
      console.log(
        `${chalk.red(
          "Cannot sell a product with no stock, please add inventory first."
        )}`
      );
      return showInventoryMessage();
    }

    let price;
    price = productToUpdate.price * amount;

    // Checks if product has a discount, then reduces price accordingly
    if (productToUpdate.discount && amount === 10) {
      price = productToUpdate.price * (amount - 1);
    }

    productToUpdate.stock -= amount;
    await db.write();
    await db.update("totalSalesInSEK", (n) => n + price).write();

    const autoUpdateInventory = await db.get("autoUpdateInventory").value();
    addSalesMessage(product_name, amount, price);
    if (autoUpdateInventory) {
      await addInventory(product_id, amount * 2);
    }
  } catch (error) {
    console.error(errorMessageHelper());
  }
}

export function addPackageSales(productName) {
  try {
    // Can add more package deals here
    if (productName === "packet 1") {
      addSales(1, 1, "shoe").then(() => addSales(2, 1, "sock"));
    }
  } catch (error) {
    console.error("Failed to sell package, reason: ", error.message);
  }
}

//Adds to inventory
export async function addInventory(product_id, amount) {
  try {
    if (!product_id || !amount) {
      console.error(errorMessageHelper());
    }
    let inventoryToUpdate = await db
      .get("inventory")
      .find({ product_id })
      .value();

    inventoryToUpdate.stock += amount;
    await db.write();
    addInventoryMessage(inventoryToUpdate.product_name, amount);
  } catch (error) {
    console.error(errorMessageHelper());
  }
}

//Shows the current inventory
export async function showInventory() {
  try {
    const currentInventory = await db.get("inventory").value();
    currentInventory.forEach((inventoryItem) => {
      showInventoryMessage(inventoryItem);
    });
  } catch (error) {
    console.error(errorMessageHelper());
  }
}

//Function to toggle automatic inventory update
export async function toggleAutoInventoryUpdate() {
  try {
    await db.update("autoUpdateInventory", (n) => (n = !n)).write();
    const autoStatus = await db.get("autoUpdateInventory").value();
    toggleAutomaticUpdateMessage(autoStatus);
  } catch (error) {
    console.error(error.message);
  }
}

export function parseProductNameToProductId(productName) {
  switch (productName) {
    case "shoes":
      return 1;
    case "socks":
      return 2;
    case "laces":
      return 3;
  }
}

export async function addDiscountToProduct(product_id, product_name) {
  try {
    if (!product_id || !product_name) {
      return console.error(errorMessageHelper());
    }
    let inventoryToUpdate = await db
      .get("inventory")
      .find({ product_id })
      .value();
    // Toggles discount boolean on and off
    inventoryToUpdate.discount = !inventoryToUpdate.discount;
    await db.write();
    toggleProductDiscountMessage(inventoryToUpdate.discount, product_name);
  } catch (error) {
    console.error(error.message);
  }
}

export function argsParser(argsArray) {
  const args = minimist(argsArray.slice(2));
  let cmd = args._[0] || "help";
  let amount = parseInt(cmd.slice(1));
  let product;
  let command;

  if (args._[1]) {
    product = args._[1];
  }
  if (args._[0] === "SP1") {
    command = "packet";
    product = "packet 1";
  } else {
    command = cmd.charAt(0).toUpperCase();
  }

  return {
    command,
    amount,
    product_id: parseProductNameToProductId(product),
    product_name: product,
  };
}

export function commandHelper(commandObject) {
  try {
    switch (commandObject.command) {
      case "H":
        showHelpMenu();
        break;
      case "S":
        addSales(
          commandObject.product_id,
          commandObject.amount,
          commandObject.product_name
        );
        break;
      case "packet":
        addPackageSales(commandObject.product_name);
        break;
      case "I":
        addInventory(commandObject.product_id, commandObject.amount);
        break;
      case "L":
        showInventory();
        break;
      case "T":
        toggleAutoInventoryUpdate();
        break;
      case "P":
        showItemList();
        break;
      case "D":
        addDiscountToProduct(
          commandObject.product_id,
          commandObject.product_name
        );
        break;
      default:
        console.error(`"${commandObject.command}" is not a valid command!`);
        showHelpMenu();
        break;
    }
  } catch (error) {
    console.error(error.message);
  }
}
