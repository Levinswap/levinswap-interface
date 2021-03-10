import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import { NavLink, Link as HistoryLink } from 'react-router-dom'

import { ArrowLeft } from 'react-feather'
import { RowBetween } from '../Row'
import QuestionHelper from '../QuestionHelper'
import { Text } from 'rebass'
import { ButtonPrimary } from '../../components/Button'
import { Link } from 'react-router-dom'

const Tabs = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 16px;

  &.${activeClassName} {
    border-radius: 5px;
    font-weight: 500;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

const ActiveText = styled.div`
  font-weight: 500;
  font-size: 20px;
`

const StyledArrowLeft = styled(ArrowLeft)`
  color: ${({ theme }) => theme.text1};
`

const SwapMenuStyled = styled.div`
  padding: 0px 15px 10px 15px;
  font-weight: 500;
`

const SwapPool = styled.div`
  display: flex;
  align-items: center;
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

export function SwapPoolTabs({ active }: { active: 'swap' | 'pool' }) {
  const { t } = useTranslation()
  return (
    <Tabs style={{ marginBottom: '20px', display: 'none' }}>
      <StyledNavLink id={`swap-nav-link`} to={'/swap'} isActive={() => active === 'swap'}>
        {t('swap')}
      </StyledNavLink>
      <StyledNavLink id={`pool-nav-link`} to={'/pool'} isActive={() => active === 'pool'}>
        {t('pool')}
      </StyledNavLink>
    </Tabs>
  )
}

export function FindPoolTabs() {
  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>Import Pool</ActiveText>
        <QuestionHelper text={"Use this tool to find pairs that don't automatically appear in the interface."} />
      </RowBetween>
    </Tabs>
  )
}

export function AddRemoveTabs({ adding, creating }: { adding: boolean; creating: boolean }) {
  const { t } = useTranslation()
  return (
    <Tabs>
      <RowBetween>
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
        </SwapMenuStyled>
        <QuestionHelper
          text={
            adding
              ? 'When you add liquidity, you are given pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.'
              : 'Removing pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.'
          }
        />
      </RowBetween>
    </Tabs>
  )
}
