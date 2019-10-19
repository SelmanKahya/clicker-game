import React from "react";
import "./App.css";
import Game from "./game";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.game = new Game();
  }

  componentDidMount() {
    setInterval(() => {
      this.game.update();
      this.setState({});
    }, 100);
  }

  update = () => {
    this.game.update();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">ÇOCUK ADAM - Çig Köfte Diyarı</header>
        <div style={{ marginBottom: "12px" }}>
          Çig Köfte: {this.game.manufacturedCigKofte} <br />
          <button
            disabled={!this.game.canMakeCigKofte()}
            onClick={() => this.game.makeCigKofte()}
          >
            Ciğ Köfte Yoğur!
          </button>
        </div>
        <div>
          <div>İşletme</div>
          <hr />
          <div>
            <table>
              <tr>
                <td style={{ width: "150px" }}>Kasadaki para:</td>
                <td>{this.game.money}₺</td>
              </tr>
              <tr>
                <td>Dolaptaki adet:</td>
                <td>{this.game.currentCigKofte}</td>
              </tr>
              <tr>
                <td>Fiyat:</td>
                <td>
                  {this.game.price}₺
                  <button
                    style={{ marginLeft: "20px" }}
                    onClick={this.game.increasePrice}
                  >
                    +
                  </button>
                  <button
                    disabled={!this.game.canDecreasePrice()}
                    style={{ marginLeft: "10px" }}
                    onClick={this.game.decreasePrice}
                  >
                    -
                  </button>
                </td>
              </tr>
              <tr>
                <td>Halkın talebi:</td>
                <td>%{this.game.demandRate}</td>
              </tr>
            </table>
          </div>
          <div style={{ marginTop: "16px" }}>
            <div>Üretim</div>
            <hr />
            <table>
              <tr>
                <td style={{ width: "150px" }}>Çiğ köfte / saniye:</td>
                <td>{this.game.lastManufacturedRate}</td>
              </tr>
              <tr>
                <td>Malzeme:</td>
                <td>
                  {this.game.material} gr
                  <button
                    style={{ marginLeft: "10px" }}
                    disabled={!this.game.canBuyMaterial()}
                    onClick={this.game.buyMaterial}
                  >
                    Satin Al! ({this.game.materialCost}₺)
                  </button>
                </td>
              </tr>
              {this.game.canBuyAutoBuyer() && (
                <tr>
                  <td>Satın alma müdürü:</td>
                  <td>
                    {this.game.hasAutoBuyer ? "Aktif" : "Yok"}
                    {!this.game.hasAutoBuyer && (
                      <button
                        style={{ marginLeft: "10px" }}
                        disabled={!this.game.canBuyAutoBuyer()}
                        onClick={this.game.buyAutoBuyer}
                      >
                        Satin Al! ({this.game.autoBuyerCost}₺)
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </table>
            <div style={{ marginTop: "16px" }}>
              <div>Çalışan:</div>
              <hr />
              <table>
                <tr>
                  <td>Çırak:</td>
                  <td style={{ width: "50px", textAlign: "center" }}>
                    {this.game.autoGenerators.errandBoy}
                  </td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      disabled={!this.game.canBuyAutoGenerator("ERRAND_BOY")}
                      onClick={() => this.game.buyAutoGenerator("ERRAND_BOY")}
                    >
                      Satın Al! ({this.game.autoGenerators.errandBoyCost}₺)
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Kalfa:</td>
                  <td style={{ width: "50px", textAlign: "center" }}>
                    {this.game.autoGenerators.foreman}
                  </td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      disabled={!this.game.canBuyAutoGenerator("FOREMAN")}
                      onClick={() => this.game.buyAutoGenerator("FOREMAN")}
                    >
                      Satın Al! ({this.game.autoGenerators.foremanCost}₺)
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Usta:</td>
                  <td style={{ width: "50px", textAlign: "center" }}>
                    {this.game.autoGenerators.master}
                  </td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      disabled={!this.game.canBuyAutoGenerator("MASTER")}
                      onClick={() => this.game.buyAutoGenerator("MASTER")}
                    >
                      Satın Al! ({this.game.autoGenerators.masterCost}₺)
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

// 1 cig kofte
// 1 lira = talep tavan = 100%
// 40 lira = talep min = 0%
