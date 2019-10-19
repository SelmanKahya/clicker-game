class Game {
  demandRate = 0;
  material = 10000;
  money = 0;
  price = 10;
  currentCigKofte = 0;
  manufacturedCigKofte = 0;
  soldCigKofte = 0;
  unitMaterialCost = 100;

  // manufacture rate
  lastManufacturedCount = 0;
  lastManufacturedRate = 0;
  lastManufacturedRateTs = Date.now();

  // price of the material
  materialCost = 500;
  materialCostLastUpdated = Date.now();

  // generators
  autoGenerators = {
    errandBoy: 0,
    errandBoyCost: 100,
    errandBoyManufactureRate: 1,
    foreman: 0,
    foremanCost: 500,
    foremanManufactureRate: 6,
    master: 0,
    masterCost: 2000,
    masterManufactureRate: 15
  };
  autoGeneratorsLastGeneratedAt = Date.now();

  // auto buyer
  hasAutoBuyer = false;
  autoBuyerCost = 15000;

  makeCigKofte = (count = 1) => {
    if (this.canMakeCigKofte(count)) {
      this.currentCigKofte += count;
      this.manufacturedCigKofte += count;
      this.material -= this.unitMaterialCost * count;
    }
  };

  update = () => {
    // generate new goods
    if (Date.now() - this.autoGeneratorsLastGeneratedAt > 1000) {
      this.makeCigKofte(
        this.autoGenerators.errandBoy *
          this.autoGenerators.errandBoyManufactureRate
      );
      this.makeCigKofte(
        this.autoGenerators.foreman * this.autoGenerators.foremanManufactureRate
      );
      this.makeCigKofte(
        this.autoGenerators.master * this.autoGenerators.masterManufactureRate
      );
      this.autoGeneratorsLastGeneratedAt = Date.now();
    }

    // auto buyer
    if (this.hasAutoBuyer && this.material < 500 && this.canBuyMaterial()) {
      this.buyMaterial();
    }

    // update material cost
    if (Date.now() - this.materialCostLastUpdated > 10000) {
      this.materialCost = Math.floor(Math.random() * 300 + 300);
      this.materialCostLastUpdated = Date.now();
    }

    // update manufacture rate
    if (Date.now() - this.lastManufacturedRateTs > 5000) {
      this.lastManufacturedRateTs = Date.now();
      this.lastManufacturedRate = Math.floor(
        (this.manufacturedCigKofte - this.lastManufacturedCount) / 5
      );
      this.lastManufacturedCount = this.manufacturedCigKofte;
    }

    // update demand
    this.updateDemand();

    // consumers purchase goods
    if (this.currentCigKofte > 0 && Math.random() * 100 < this.demandRate) {
      this.purchaseCigKofte();
    }
  };

  updateDemand = () => {
    let rate;
    if (this.price <= 40) {
      rate = (2 / Math.sqrt(this.price)) * 100;
    } else {
      const maxRate = (2 / Math.sqrt(40)) * 100;
      // 40tl 20%
      // 60tl 0%
      rate = (maxRate * (60 - this.price)) / 20;
      console.log(rate, maxRate);
    }
    this.demandRate = Math.floor(Math.max(0, rate));
  };

  purchaseCigKofte = () => {
    this.currentCigKofte -= 1;
    this.money += this.price;
  };

  canBuyAutoBuyer = () => {
    return this.manufacturedCigKofte > 2000 && this.money >= this.autoBuyerCost;
  };

  canBuyAutoGenerator = type => {
    switch (type) {
      case "ERRAND_BOY":
        return this.money >= this.autoGenerators.errandBoyCost;
      case "FOREMAN":
        return this.money >= this.autoGenerators.foremanCost;
      case "MASTER":
        return this.money >= this.autoGenerators.masterCost;
      default:
        return false;
    }
  };

  canBuyMaterial = () => {
    return this.money >= this.materialCost;
  };

  canMakeCigKofte = (count = 1) => {
    return this.material >= this.unitMaterialCost * count;
  };

  canDecreasePrice = () => {
    return this.price > 1;
  };

  buyMaterial = () => {
    if (this.canBuyMaterial()) {
      return;
    }
    this.materialCost += Math.floor(Math.random() * 20 + 10);
    this.materialCostLastUpdated = Date.now();

    this.material += 10000;
    this.money -= this.materialCost;
  };

  buyAutoBuyer = () => {
    if (this.canBuyAutoBuyer()) {
      return;
    }
    this.money -= this.autoBuyerCost;
    this.hasAutoBuyer = true;
  };

  buyAutoGenerator = type => {
    if (!this.canBuyAutoGenerator(type)) {
      return;
    }
    switch (type) {
      case "ERRAND_BOY":
        this.autoGenerators.errandBoy++;
        this.money -= this.autoGenerators.errandBoyCost;
        this.autoGenerators.errandBoyCost += Math.floor(
          (this.autoGenerators.errandBoyCost / 100) * 10
        );
        return;
      case "FOREMAN":
        this.autoGenerators.foreman++;
        this.money -= this.autoGenerators.foremanCost;
        this.autoGenerators.foremanCost += Math.floor(
          (this.autoGenerators.foremanCost / 100) * 10
        );
        return;
      case "MASTER":
        this.autoGenerators.master++;
        this.money -= this.autoGenerators.masterCost;
        this.autoGenerators.masterCost += Math.floor(
          (this.autoGenerators.masterCost / 100) * 10
        );
        return;
      default:
        return false;
    }
  };

  increasePrice = () => {
    this.price += 1;
  };

  decreasePrice = () => {
    this.price -= 1;
  };
}

export default Game;
