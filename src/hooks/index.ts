import { useState, useCallback, useEffect, useRef } from 'react'
import { shade } from 'polished'
import Vibrant from 'node-vibrant'
import { hex } from 'wcag-contrast'
import { isAddress } from '../utils'
import copy from 'copy-to-clipboard'

export function useColor(tokenAddress, token) {
  const [color, setColor] = useState('#2172E5')
  let path
  if (tokenAddress) {
    path = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/${isAddress(
      tokenAddress
    )}/logo.png`

    if(tokenAddress?.toLowerCase() === '0x1f01dc57c66c2f87d8eab9c625d335e9defe6912'){
      path = 'https://zcore.network/coins/ZCR.png'
    }

    if(tokenAddress?.toLowerCase() === '0x4495e673ee53c61ce79c35d5e299733639362aec'){
      path = 'https://zcore.network/coins/LQX.png'
    }

    if(tokenAddress?.toLowerCase() === '0xa5594a2caf790c8eeb9037ab18d0da305bbdc8b6'){
      path = 'https://zcore.network/coins/ZYON.png'
    }

    if(tokenAddress?.toLowerCase() === '0xf0ebeb79792190a1be089c522c82e724a4f8c8f1'){
      path = 'https://zcore.network/coins/PEPS.png'
    }

    if(tokenAddress?.toLowerCase() === '0xd47ba9a00eb87b9e753c6651e402dad7d9f1c4ca'){
      path = 'https://zcore.network/coins/BTCT.png'
    }    

    if (path) {
      Vibrant.from(path).getPalette((err, palette) => {
        if (palette && palette.Vibrant) {
          let detectedHex = palette.Vibrant.hex
          let AAscore = hex(detectedHex, '#FFF')
          while (AAscore < 3) {
            detectedHex = shade(0.005, detectedHex)
            AAscore = hex(detectedHex, '#FFF')
          }
          if (token === 'DAI') {
            setColor('#FAAB14')
          } else {
            setColor(detectedHex)
          }
        }
      })
    }
  }
  return color
}

export function useCopyClipboard(timeout = 500) {
  const [isCopied, setIsCopied] = useState(false)

  const staticCopy = useCallback((text) => {
    const didCopy = copy(text)
    setIsCopied(didCopy)
  }, [])

  useEffect(() => {
    if (isCopied) {
      const hide = setTimeout(() => {
        setIsCopied(false)
      }, timeout)

      return () => {
        clearTimeout(hide)
      }
    }
  }, [isCopied, setIsCopied, timeout])

  return [isCopied, staticCopy]
}

export const useOutsideClick = (ref, ref2, callback) => {
  const handleClick = (e) => {
    if (ref.current && ref.current && !ref2.current) {
      callback(true)
    } else if (ref.current && !ref.current.contains(e.target) && ref2.current && !ref2.current.contains(e.target)) {
      callback(true)
    } else {
      callback(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

export default function useInterval(callback: () => void, delay: null | number) {
  const savedCallback = useRef<() => void>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      const current = savedCallback.current
      current && current()
    }

    if (delay !== null) {
      tick()
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
    return
  }, [delay])
}
