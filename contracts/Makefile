export STELLAR_NETWORK=testnet
export STELLAR_ACCOUNT=default
# export STELLAR_NETWORK=vc
# export STELLAR_ACCOUNT=live

# TESTNET
export SMART_WALLET_WASM=0f6cdcdcc5e1af382aef42b94aa31c79484cbb1ae6a15bc65ec8abda4eb0f5a4
export SAC_CONTRACT_ID=CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC

build:
	set -x
	rm -rf out/
	rm -rf smart-wallet/target/wasm32-unknown-unknown/
	rm -rf market/target/wasm32-unknown-unknown/
	mkdir -p out/
	cargo build --target wasm32-unknown-unknown --release
	cd smart-wallet && cargo build --target wasm32-unknown-unknown --release --package smart-wallet
	cd market && cargo build --target wasm32-unknown-unknown --release --package market
	cd oracle && cargo build --target wasm32-unknown-unknown --release
	cp target/wasm32-unknown-unknown/release/smart_wallet.wasm out/
	cp target/wasm32-unknown-unknown/release/market.wasm out/
	cp target/wasm32-unknown-unknown/release/oracle.wasm out/
	stellar contract optimize --wasm out/smart_wallet.wasm
	stellar contract optimize --wasm out/market.wasm
	stellar contract optimize --wasm out/oracle.wasm

upload:
	soroban contract upload --wasm ./out/smart_wallet.optimized.wasm --source $(STELLAR_ACCOUNT)
	soroban contract upload --wasm ./out/market.optimized.wasm --source $(STELLAR_ACCOUNT)
	soroban contract upload --wasm ./out/oracle.optimized.wasm --source $(STELLAR_ACCOUNT)

bindings:
	stellar contract bindings typescript --id $(SAC_CONTRACT_ID) --network $(STELLAR_NETWORK) --output-dir ./out/sac-sdk --overwrite
	stellar contract bindings typescript --wasm ./target/wasm32-unknown-unknown/release/market.wasm --network $(STELLAR_NETWORK) --output-dir ./out/market-sdk --overwrite
	stellar contract bindings typescript --wasm ./target/wasm32-unknown-unknown/release/smart_wallet.wasm --network $(STELLAR_NETWORK) --output-dir ./out/passkey-kit-sdk --overwrite
	stellar contract bindings typescript --wasm ./target/wasm32-unknown-unknown/release/oracle.wasm --network $(STELLAR_NETWORK) --output-dir ./out/oracle-sdk --overwrite

fmt:
	@cd smart-wallet && cargo fmt --all
	@cd market && cargo fmt --all

clean:
	rm -rf out/
	rm -rf smart-wallet/target/
	rm -rf market/target/
	@cd smart-wallet && cargo clean
	@cd market && cargo clean