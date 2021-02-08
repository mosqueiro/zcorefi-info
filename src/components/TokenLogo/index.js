import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { isAddress } from '../../utils/index.js'
import PlaceHolder from '../../assets/placeholder.png'
import EthereumLogo from '../../assets/eth.png'

const BAD_IMAGES = {}

const Inline = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
`

const Image = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: white;
  border-radius: 50%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

const StyledEthereumLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
`

export default function TokenLogo({ address, header = false, size = '24px', ...rest }) {
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
  }, [address])

  if (error || BAD_IMAGES[address]) {
    return (
      <Inline>
        <Image {...rest} alt={''} src={PlaceHolder} size={size} />
      </Inline>
    )
  }

  // hard coded fixes for trust wallet api issues
  if (address?.toLowerCase() === '0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb') {
    address = '0x42456d7084eacf4083f1140d3229471bba2949a8'
  }

  if (address?.toLowerCase() === '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f') {
    address = '0xc011a72400e58ecd99ee497cf89e3775d4bd732f'
  }

  if (address?.toLowerCase() === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') {
    return (
      <StyledEthereumLogo size={size} {...rest}>
        <img
          src={EthereumLogo}
          style={{
            boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.075)',
            borderRadius: '24px',
          }}
          alt=""
        />
      </StyledEthereumLogo>
    )
  }

  let path = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/${isAddress(
    address
  )}/logo.png`


if (address?.toLowerCase() === '0x1f01dc57c66c2f87d8eab9c625d335e9defe6912') {
  path = 'https://zcore.network/coins/ZCR.png'
}


if (address?.toLowerCase() === '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c') {
  path = 'https://zcore.network/coins/WBNB.png'
}

if (address?.toLowerCase() === '0x4495e673ee53c61ce79c35d5e299733639362aec') {
  path = 'https://zcore.network/coins/LQX.png'
}


if (address?.toLowerCase() === '0xa5594a2caf790c8eeb9037ab18d0da305bbdc8b6') {
  path = 'https://zcore.network/coins/ZYON.png'
}


if (address?.toLowerCase() === '0xf0ebeb79792190a1be089c522c82e724a4f8c8f1') {
  path = 'https://zcore.network/coins/PEPS.png'
}

if (address?.toLowerCase() === '0xd47ba9a00eb87b9e753c6651e402dad7d9f1c4ca') {
  path = 'https://zcore.network/coins/BTCT.png'
}

if (address?.toLowerCase() === '0x9045b0eda6b6a556cf9b3d81c2db47411714f847') {
  path = 'https://zcore.network/coins/BBK.png'
}

if (address?.toLowerCase() === '0xdee6ae8455be6470c9dd5865df191414af9c287e') {
  path = 'https://zcore.network/coins/KSOC.png'
}


  return (
    <Inline>
      <Image
        {...rest}
        alt={''}
        src={path}
        size={size}
        onError={(event) => {
          BAD_IMAGES[address] = true
          setError(true)
          event.preventDefault()
        }}
      />
    </Inline>
  )
}
