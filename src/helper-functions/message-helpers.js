import chalk from "chalk";

export function addSalesMessage(productName, amount, price) {
  if (!productName) return;
  const message = {
    addSalesMessage: `
  
        Sold ${chalk.blueBright(amount)} of ${chalk.blueBright(
      productName
    )} for ${chalk.blueBright(price)} SEK 
      
        `,
  };

  return console.log(message.addSalesMessage);
}

export function addPackageMessage(amount, productName) {
  const message = {
    addSalesMessage: `
  
        Sold ${chalk.blueBright(amount)} of ${chalk.blueBright(
      productName
    )} which includes : 
        1x Shoe
        1x Socks
      
        `,
  };

  console.log(message.addSalesMessage);
}

export function addInventoryMessage(productName, amount) {
  if (!productName) return;

  const message = {
    addInventoryMessage: `
        Added ${chalk.blueBright(amount)} to ${chalk.blueBright(
      productName
    )} inventory
        `,
  };
  console.log(message.addInventoryMessage);
}

export function showInventoryMessage(inventoryItem) {
  const message = {
    showInventoryMessage: `
          Current ${chalk.blueBright.bold(
            inventoryItem.product_name
          )} stock is: ${chalk.blueBright.bold(inventoryItem.stock)}
          `,
  };
  console.log(message.showInventoryMessage);
}

export function showHelpMenu() {
  const message = {
    helpMessage: `

  ${chalk.greenBright(
    'Commands and how to use them "store <command>" e.g "store S10 laces" '
  )}

    ${chalk.blueBright("P")} ............... Show product list with prices
    ${chalk.blueBright(
      "S<amount>+<product>"
    )} ................ Adds to sales - e.g "S10 Shoes"
    ${chalk.blueBright(
      "I<amount>+<product>"
    )} ........... Adds to inventory - e.g "I20 Laces"
    ${chalk.blueBright(
      "SP1"
    )} ................ Adds package 1 to sales - e.g "SP1"
    ${chalk.blueBright("L")}.............. Shows the current stock balance
    ${chalk.blueBright(
      "T"
    )} ............ Toggle automatic inventory increase on sales
    ${chalk.blueBright(
      "D + <product>"
    )} ............ Toggle discount on product - eg "D socks"
    ${chalk.blueBright("help")} ............... Show help menu
  `,
  };
  console.log(message.helpMessage);
}

export function showItemList() {
  const message = {
    itemMenuMessage: `
  
      ${chalk.greenBright("List of items and prices")}
  
      ${chalk.blueBright("Shoes")} ........... 30 :- ${chalk.green.bold(
      "SALE buy 10 get 1 for free"
    )}
      ${chalk.blueBright("Socks")} ........... 50 :-
      ${chalk.blueBright("Laces")} ........... 20 :- 
      ${chalk.blueBright("Package 1x Shoes 1x Socks")} ........... 80 :-
    `,
  };
  console.log(message.itemMenuMessage);
}

export function toggleAutomaticUpdateMessage(autoStatus) {
  const autoStatusMessage = autoStatus
    ? `${chalk.green.bold("ON")}`
    : `${chalk.red.bold("OFF")}`;

  const message = {
    toggleAutomaticMessage: `
  
        Automatic stock refill is : ${autoStatusMessage}
  
        `,
  };
  console.log(message.toggleAutomaticMessage);
}

export function toggleProductDiscountMessage(discountStatus, productName) {
  const discountStatusMessage = discountStatus
    ? `${chalk.green.bold("Active")}`
    : `${chalk.red.bold("Inactive")}`;

  const message = {
    toggleDiscountMessage: `

    Discount on product ${chalk.blueBright.bold(
      productName
    )} is: ${discountStatusMessage}

    `,
  };
  console.log(message.toggleDiscountMessage);
}

export function errorMessageHelper() {
  return "Command failed, please use a valid command. Hint: 'store H' for a list";
}
