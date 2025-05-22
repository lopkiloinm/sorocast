export STELLAR_NETWORK=testnet
export STELLAR_ACCOUNT=default
# export STELLAR_NETWORK=vc
# export STELLAR_ACCOUNT=live

# TESTNET
export SMART_WALLET_WASM=0f6cdcdcc5e1af382aef42b94aa31c79484cbb1ae6a15bc65ec8abda4eb0f5a4
export MARKET_POLICY_WASM=ca082bacb5c1ecc9919edc344668a6aa715f0f91548a06747ea8ff5d9bbb6862
export USER_POLICY_WASM=6f5aa80a73df612b1ca76e0007beadd63dfe1ff89bc0944d166f4ae780765c69
export SMART_WALLET_FACTORY=CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC

build:
	set -x
	rm -rf out/
	rm -rf smart-wallet/target/wasm32-unknown-unknown/
	rm -rf policies/user_policy/target/wasm32-unknown-unknown/
	rm -rf policies/market_policy/target/wasm32-unknown-unknown/
	mkdir -p out/
	cargo build --target wasm32-unknown-unknown --release
	cd smart-wallet && cargo build --target wasm32-unknown-unknown --release --package smart-wallet
	cd policies/user_policy && cargo build --target wasm32-unknown-unknown --release --package user_policy
	cd policies/market_policy && cargo build --target wasm32-unknown-unknown --release --package market_policy
	cp target/wasm32-unknown-unknown/release/smart_wallet.wasm out/
	cp target/wasm32-unknown-unknown/release/user_policy.wasm out/
	cp target/wasm32-unknown-unknown/release/market_policy.wasm out/
	stellar contract optimize --wasm out/smart_wallet.wasm
	stellar contract optimize --wasm out/user_policy.wasm
	stellar contract optimize --wasm out/market_policy.wasm

upload:
	soroban contract upload --wasm ./out/smart_wallet.optimized.wasm --source $(STELLAR_ACCOUNT)
	soroban contract upload --wasm ./out/user_policy.optimized.wasm --source $(STELLAR_ACCOUNT)
	soroban contract upload --wasm ./out/market_policy.optimized.wasm --source $(STELLAR_ACCOUNT)

bindings:
	stellar contract bindings typescript --id $(SMART_WALLET_FACTORY) --network $(STELLAR_NETWORK) --output-dir ./out/sac-sdk --overwrite
	stellar contract bindings typescript --wasm ./target/wasm32-unknown-unknown/release/smart_wallet.wasm --network $(STELLAR_NETWORK) --output-dir ./out/passkey-kit-sdk --overwrite
	stellar contract bindings typescript --wasm ./target/wasm32-unknown-unknown/release/user_policy.wasm --network $(STELLAR_NETWORK) --output-dir ./out/user-policy-sdk --overwrite
	stellar contract bindings typescript --wasm ./target/wasm32-unknown-unknown/release/market_policy.wasm --network $(STELLAR_NETWORK) --output-dir ./out/market-policy-sdk --overwrite

fmt:
	@cd smart-wallet && cargo fmt --all
	@cd policies/user_policy && cargo fmt --all
	@cd policies/market_policy && cargo fmt --all

clean:
	rm -rf out/
	rm -rf smart-wallet/target/
	rm -rf policies/user_policy/target/
	rm -rf policies/market_policy/target/
	@cd smart-wallet && cargo clean
	@cd policies/user_policy && cargo clean
	@cd policies/market_policy && cargo clean