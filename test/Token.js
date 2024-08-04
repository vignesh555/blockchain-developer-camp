const { expect } = require('chai');
const { ethers } = require("hardhat")

const getTokenValueEther = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether');
}

const MY_TOKEN = "My Token";
const SYMBOL = "DAPP";
const TOKEN_SUPPLY = "1000000";
const DECIMALS = 18;

describe('Token contract', () => {
    let token;
    let accounts;
    let deployer;
    beforeEach(async () => {
        const tokenInstance = await ethers.getContractFactory('Token');
        token = await tokenInstance.deploy(
            MY_TOKEN,
            SYMBOL,
            TOKEN_SUPPLY
        );
        accounts = await ethers.getSigners();
        deployer = accounts[0];
    })
  it('has a name', async () => {
    const name = await token.name();
    expect(name).to.equal(MY_TOKEN);
  })

  it('has a symbol', async () => {
    const symbol = await token.symbol();
    expect(symbol).to.equal(SYMBOL);
  })

  it('has a decimals', async () => {
    const decimals = await token.decimals();
    expect(decimals).to.equal(DECIMALS);
  })

  it('has a totalSupply', async () => {
    const totalSupply = await token.totalSupply();
    expect(totalSupply).to.equal(getTokenValueEther(TOKEN_SUPPLY));
  })

  it('has a totalSupply to deplyer', async () => {
    console.log(await token.balanceOf(accounts[0].address))
    console.log(await token.balanceOf(accounts[1].address))
    console.log(await token.balanceOf(accounts[2].address))
    console.log(await token.balanceOf(accounts[3].address))

    const totalSupply = await token.balanceOf(deployer.address);
    expect(totalSupply).to.equal(getTokenValueEther(TOKEN_SUPPLY));
  })

})
