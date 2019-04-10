import { setupJwtStrategy } from './strategies/jwtStrategy'
import { setupLdapTokenStrategy } from './strategies/ldapStrategy'

export default function () {
  setupLdapTokenStrategy()
  setupJwtStrategy()
}
