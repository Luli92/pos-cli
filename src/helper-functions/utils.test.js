import {
  addSales,
  addInventory,
  addPackageSales,
  addDiscountToProduct,
  commandHelper,
} from "./utils";

describe("Util functions", () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  describe("addSales", () => {
    it("fails to add sale when called with no params", async () => {
      addSales();
      expect(consoleSpy).toHaveBeenCalled();
    });

    it("fails to add sale when called with wrong params", async () => {
      addSales(undefined, null, "xx");
      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe("addInventory", () => {
    it("fails to add inventory when called with no params", () => {
      addInventory();
      expect(consoleSpy).toHaveBeenCalled();
    });

    it("fails to add inventory when called with wrong params", () => {
      addInventory(undefined, "xx");
      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe("addPackageSales", () => {
    it("fails to add package when called with no params", () => {
      addPackageSales();
      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe("addDiscountToProduct", () => {
    it("fails to add inventory when called with no params", () => {
      addDiscountToProduct();
      expect(consoleSpy).toHaveBeenCalled();
    });
    it("fails to add inventory when called with wrong params", () => {
      addDiscountToProduct(undefined, "xx");
      expect(consoleSpy).toHaveBeenCalled();
    });
  });
  describe("commandHelper", () => {
    it("fails to switch commands when called with no params", () => {
      commandHelper();
      expect(consoleSpy).toHaveBeenCalled();
    });
    it("fails to add inventory when called with wrong params", () => {
      commandHelper({ command: "xx" });
      expect(consoleSpy).toHaveBeenCalled();
    });
  });
});
