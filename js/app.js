window.addEventListener("load", async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();
      const connectedWallet = document.getElementById("connectedWallet");
      const walletAddress = document.getElementById("walletAddress");
      walletAddress.textContent = accounts[0];
      connectedWallet.style.display = "block";

      const abi = [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_rate",
              type: "uint256",
            },
            {
              internalType: "contract ERC20",
              name: "_token",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_max",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "purchaser",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "beneficiary",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "TokenPurchase",
          type: "event",
        },
        {
          stateMutability: "payable",
          type: "fallback",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_weiAmount",
              type: "uint256",
            },
          ],
          name: "_getTokenAmount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_beneficiary",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_weiAmount",
              type: "uint256",
            },
          ],
          name: "_preValidatePurchase",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_beneficiary",
              type: "address",
            },
          ],
          name: "buyTokens",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_beneficiary",
              type: "address",
            },
          ],
          name: "maxCore",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "purchasedCore",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "rate",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_rate",
              type: "uint256",
            },
          ],
          name: "setPresaleRate",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "token",
          outputs: [
            {
              internalType: "contract ERC20",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "weiMaxPurchaseCore",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "weiRaised",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "withdrawCoins",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "tokenAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokens",
              type: "uint256",
            },
          ],
          name: "withdrawTokens",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ];

      const contractAddress = "0xc7A23267e711E36C5C0E4d242BCe96Bcc2e729Bd";

      const contract = new web3.eth.Contract(abi, contractAddress);

      const presaleRateWei = await contract.methods.rate().call();

      const presaleRate = web3.utils.fromWei(presaleRateWei, "ether");
      document.getElementById("presaleRate").textContent = presaleRate;

      const weiRaisedWei = await contract.methods.weiRaised().call();

      const weiRaised = web3.utils.fromWei(weiRaisedWei, "ether");
      document.getElementById("weiRaised").textContent = weiRaised;

      const maxPurchaseWei = await contract.methods.maxCore(accounts[0]).call();

      const maxPurchase = web3.utils.fromWei(maxPurchaseWei, "ether");
      document.getElementById("maxPurchase").textContent = maxPurchase;

      const tokenContractAddress = "0x9ac0c69F77Cc5c2f0A5c8DA8fAc37DDcdBbe5739";
      const tokenContractAbi = [
        { inputs: [], stateMutability: "nonpayable", type: "constructor" },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "spender", type: "address" },
          ],
          name: "allowance",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
          ],
          name: "approve",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "account", type: "address" },
          ],
          name: "balanceOf",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "decimals",
          outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "spender", type: "address" },
            {
              internalType: "uint256",
              name: "subtractedValue",
              type: "uint256",
            },
          ],
          name: "decreaseAllowance",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "addedValue", type: "uint256" },
          ],
          name: "increaseAllowance",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
          ],
          name: "transfer",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
          ],
          name: "transferFrom",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "newOwner", type: "address" },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];

      const tokenContract = new web3.eth.Contract(
        tokenContractAbi,
        tokenContractAddress
      );

      const tokenBalanceElement = document.getElementById("tokenBalance");

      const tokenBalanceWei = await tokenContract.methods
        .balanceOf(accounts[0])
        .call();
      const tokenBalance = web3.utils.fromWei(tokenBalanceWei, "ether");
      tokenBalanceElement.textContent = tokenBalance;

      const coreBalanceElement = document.getElementById("coreBalance");

      const coreBalanceWei = await web3.eth.getBalance(accounts[0]);
      const coreBalance = web3.utils.fromWei(coreBalanceWei, "ether");
      coreBalanceElement.textContent = coreBalance;

      const buyTokensForm = document.getElementById("buyTokensForm");
      buyTokensForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const beneficiaryAddress = accounts[0];
        const buyAmount = document.getElementById("buyAmount").value;

        if (!/^\d+(\.\d+)?$/.test(buyAmount)) {
          alert("Mohon masukkan angka desimal yang valid.");
          return;
        }

        const gasLimit = 200000;
        const gasPrice = web3.utils.toWei("30", "gwei");

        try {
          await contract.methods.buyTokens(beneficiaryAddress).send({
            from: accounts[0],
            value: web3.utils.toWei(buyAmount, "ether"),
            gas: gasLimit,
            gasPrice: gasPrice,
          });

          const operationResult = document.getElementById("operationResult");
          const operationMessage = document.getElementById("operationMessage");
          operationMessage.textContent = "Pembelian token berhasil";
          operationResult.style.display = "block";
        } catch (error) {
          console.error(error);
        }
      });

      const setPresaleRateForm = document.getElementById("setPresaleRateForm");
      setPresaleRateForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const newRate = document.getElementById("newRate").value;
        try {
          await contract.methods
            .setPresaleRate(newRate)
            .send({ from: accounts[0] });
          const operationResult = document.getElementById("operationResult");
          const operationMessage = document.getElementById("operationMessage");
          operationMessage.textContent = "Presale rate set successfully";
          operationResult.style.display = "block";
        } catch (error) {
          console.error(error);
        }
      });

      const withdrawCoinsButton = document.getElementById("withdrawCoins");
      withdrawCoinsButton.addEventListener("click", async () => {
        try {
          await contract.methods.withdrawCoins().send({ from: accounts[0] });
          const operationResult = document.getElementById("operationResult");
          const operationMessage = document.getElementById("operationMessage");
          operationMessage.textContent = "Coins withdrawn successfully";
          operationResult.style.display = "block";
        } catch (error) {
          console.error(error);
        }
      });

      const withdrawTokensForm = document.getElementById("withdrawTokensForm");
      withdrawTokensForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const tokenAddress = document.getElementById("tokenAddress").value;
        const tokenAmount = document.getElementById("tokenAmount").value;
        try {
          await contract.methods
            .withdrawTokens(tokenAddress, tokenAmount)
            .send({ from: accounts[0] });
          const operationResult = document.getElementById("operationResult");
          const operationMessage = document.getElementById("operationMessage");
          operationMessage.textContent = "Tokens withdrawn successfully";
          operationResult.style.display = "block";
        } catch (error) {
          console.error(error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("Web3 is not available in your browser.");
  }

  const connectWalletButton = document.getElementById("connectWallet");
  connectWalletButton.addEventListener("click", async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  });
});
