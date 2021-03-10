import React from 'react'
import Settings from '../Settings'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import { ButtonPrimary } from '../../components/Button'
import { Link } from 'react-router-dom'
import { Text } from 'rebass'

const SwapMenuStyled = styled.div`
  padding: 0px 15px 10px 15px;
  font-weight: 500;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
  opacity: 0.85;
  transition: 0.3s ease;

  &.${activeClassName} {
    border-radius: 25px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover {
    opacity: 1;
  }
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

const ResponsiveButtonPrimary = styled(ButtonPrimary)`
  width: fit-content;
  border-radius: 5px:
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};
  margin-left: 15px;
  background: white;
  color: ${({ theme }) => theme.text1};
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.85;
  transition: 0.3s ease;

  hover {
    opacity: 1;
    color: ${({ theme }) => theme.text1};
    background-color: white;

  }
`

const SwapPool = styled.div`
  display: flex;
  align-items: center;
`
const SettingsStyled = styled.div`
  margin: 10px 0px;
`

export default function SwapMenu() {
  const { t } = useTranslation()
  return (
    <SwapMenuStyled>
      <SwapPool>
        <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
          {t('swap')}
        </StyledNavLink>
        <ResponsiveButtonPrimary id="join-pool-button" as={Link} borderRadius="5px" to="/add/ETH">
          <Text fontWeight={500} fontSize={16}>
            + Liquidity
          </Text>
        </ResponsiveButtonPrimary>
      </SwapPool>
      <SettingsStyled>
        <Settings />
      </SettingsStyled>
    </SwapMenuStyled>
  )
}
