*note: deprecated. don't use this module right now.*

# testnet

Single-command deployment of testnets for [Lotion](https://github.com/keppel/lotion) apps via [now](https://zeit.co/now).

## Installation
`testnet` first requires that you've first installed and configured `now`.
```bash
$ npm i -g now
$ now login
```
then install `testnet`:
```bash
$ npm i -g testnet
```

## Usage
Make sure you've configured a "start" script that runs your Lotion app in your `package.json`,
then simply:
```bash
$ cd my-lotion-app/
$ testnet
```
outputs:

```
tendermint rpc now exposed at: https://lotionapp-123vfgjnt.now.sh

testnet genesis json:
{
  "app_hash": "618DE7D9F46F3F697D827A1B6D84974760D5DEDA62E4E592ADAA3C646602A94C",
  "chain_id": "test-chain-rNaGXy",
  "genesis_time": "2017-11-27T20:53:07.82Z",
  "validators": [
    {
      "name": "",
      "power": 10,
      "pub_key": {
        "data": "0723268CAB5EA8721924FEB8A699773D0D13D7B309A12F08F5E4F9CA806E3055",
        "type": "ed25519"
      }
    }
  ]
}
```

more features coming soon.

## License
MIT

