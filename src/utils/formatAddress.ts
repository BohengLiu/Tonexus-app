import TonWeb from 'tonweb'


function toHexString(byteArray: Uint8Array) {
  return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}


export const rawFormToFriendlyAddress = (raw: string) => {
  const addrObj = new TonWeb.utils.Address(raw) // 有错
  return addrObj.toString(true, true, true)
}

export const friendlyAddressToRawForm = (addr: string) => {
  const addrObj = new TonWeb.utils.Address(addr)
  return `${addrObj.wc}:${toHexString(addrObj.hashPart)}`
}

