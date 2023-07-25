const TonWeb = require('tonweb')



const address = "EQCbacj-io9fkNb5iVP1XUCcGR6hZKdDXfBZbXsXzcvnN-B3"
const hexAddress = "0:9b69c8fe8a8f5f90d6f98953f55d409c191ea164a7435df0596d7b17cdcbe737"

// const addrObj = new TonWeb.utils.Address(address)
// console.log(addrObj)
// console.log(addrObj.toString())
// console.log(addrObj.hashPart.toString(16))

const addrObj2 = new TonWeb.utils.Address(address)

// console.log(addrObj2)
console.log(`${addrObj2.wc}:${toHexString(addrObj2.hashPart)}`)

const addrObj3 = new TonWeb.utils.Address(hexAddress)
console.log(addrObj3.toString(true, true, true))

const bounceable_tag = 0x11;
const non_bounceable_tag = 0x51;
const test_flag = 0x80;

function stringToBytes(str, size = 1) {
  let buf;
  let bufView;
  if (size === 1) {
      buf = new ArrayBuffer(str.length);
      bufView = new Uint8Array(buf);
  }
  if (size === 2) {
      buf = new ArrayBuffer(str.length * 2);
      bufView = new Uint16Array(buf);
  }
  if (size === 4) {
      buf = new ArrayBuffer(str.length * 4);
      bufView = new Uint32Array(buf);
  }
  for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
  }
  return new Uint8Array(bufView.buffer);
}

function base64toString(base64) {
  if (typeof self === 'undefined') {
      return Buffer.from(base64, 'base64').toString('binary'); // todo: (tolya-yanot) Buffer silently ignore incorrect base64 symbols, we need to throw error
  } else {
      return atob(base64);
  }
}

function base64ToBytes(base64) {
  const binary_string = base64toString(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
}

function crc16(data) {
  const poly = 0x1021;
  let reg = 0;
  const message = new Uint8Array(data.length + 2);
  message.set(data);
  for (let byte of message) {
      let mask = 0x80;
      while (mask > 0) {
          reg <<= 1;
          if (byte & mask) {
              reg += 1;
          }
          mask >>= 1
          if (reg > 0xffff) {
              reg &= 0xffff;
              reg ^= poly;
          }
      }
  }
  return new Uint8Array([Math.floor(reg / 256), reg % 256]);
}

function parseFriendlyAddress(addressString) {
  if (addressString.length !== 48) {
      throw new Error(`User-friendly address should contain strictly 48 characters`);
  }
  const data = stringToBytes(base64toString(addressString));
  if (data.length !== 36) { // 1byte tag + 1byte workchain + 32 bytes hash + 2 byte crc
      throw "Unknown address type: byte length is not equal to 36";
  }
  const addr = data.slice(0, 34);
  const crc = data.slice(34, 36);
  const calcedCrc = crc16(addr);
  if (!(calcedCrc[0] === crc[0] && calcedCrc[1] === crc[1])) {
      throw "Wrong crc16 hashsum";
  }
  let tag = addr[0];
  let isTestOnly = false;
  let isBounceable = false;
  if (tag & test_flag) {
      isTestOnly = true;
      tag = tag ^ test_flag;
  }
  if ((tag !== bounceable_tag) && (tag !== non_bounceable_tag))
      throw "Unknown address tag";

  isBounceable = tag === bounceable_tag;

  let workchain = null;
  if (addr[1] === 0xff) { // TODO we should read signed integer here
      workchain = -1;
  } else {
      workchain = addr[1];
  }
  if (workchain !== 0 && workchain !== -1) throw new Error('Invalid address wc ' + workchain);

  const hashPart = addr.slice(2, 34);
  return {isTestOnly, isBounceable, workchain, hashPart};
}

function toHexString(byteArray) {
  return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}


const result = parseFriendlyAddress(address)
console.log(`${result.workchain}:${toHexString(result.hashPart)}`)

// console.log(parseFriendlyAddress(address))