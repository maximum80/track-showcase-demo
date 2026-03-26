import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { User, Lock, Globe, Chrome, KeyRound, AlertCircle } from 'lucide-react'
import { cn, Button, Input } from '../../components/ui'
import { isAuthenticated, signIn } from '../../auth'

function LogoWorkforce({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 312 71" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Track Workforce">
      <path d="M122.109 49.6709H117.697L116.536 21.0786H122.749L123.139 40.5442L136.876 20.8181H140.117L140.648 40.5442L154.164 21.0786H160.377L139.977 49.6709H135.565L134.875 31.5377L122.099 49.6709H122.109Z" fill="currentColor"/>
      <path d="M174.734 33.1307C176.125 34.8037 176.645 37.3784 175.654 40.414C174.684 43.4195 172.493 45.9842 170.022 47.6573C167.881 49.1199 164.989 50.272 161.298 50.272C157.606 50.272 155.465 49.1199 154.264 47.6573C152.873 45.9842 152.353 43.4195 153.334 40.414C154.324 37.3684 156.505 34.7937 158.986 33.1307C161.127 31.668 164.019 30.5159 167.711 30.5159C171.402 30.5159 173.543 31.668 174.744 33.1307H174.734ZM169.992 40.414C170.942 37.4987 169.361 35.1443 166.21 35.1443C163.058 35.1443 159.957 37.4987 159.006 40.414C158.086 43.2492 159.607 45.6436 162.798 45.6436C165.99 45.6436 169.071 43.2392 169.992 40.414Z" fill="currentColor"/>
      <path d="M182.588 31.117H188.08L187.18 33.9021C188.551 32.3192 189.971 31.5478 190.442 31.3274C191.462 30.8164 192.643 30.5159 193.943 30.5159C194.894 30.5159 195.584 30.7263 196.144 30.9467L193.833 35.8356C193.263 35.3647 192.613 35.1544 191.492 35.1544C190.452 35.1544 188.861 35.3647 187.36 36.6571C185.919 37.8994 185.359 39.4823 184.939 40.7747L182.048 49.691H176.555L182.578 31.127L182.588 31.117Z" fill="currentColor"/>
      <path d="M208.25 18.4237L201.937 37.8894L211.432 31.117H218.545L206.759 39.2619L213.242 49.6809H205.949L201.277 41.7464L200.526 42.2574L198.115 49.6709H192.623L202.767 18.4137H208.26L208.25 18.4237Z" fill="currentColor"/>
      <path d="M226.499 35.5652L221.917 49.671H216.424L221.006 35.5652H218.935L220.386 31.107H222.457L224.108 26.0077C224.668 24.2945 225.749 21.3792 228.8 19.4457C230.281 18.5039 232.092 17.9028 234.123 17.9028C235.333 17.9028 236.254 18.1132 237.064 18.544L235.523 23.3027C234.943 22.7417 234.243 22.5313 233.302 22.5313C232.582 22.5313 231.801 22.7016 231.011 23.473C230.341 24.1643 229.881 25.1461 229.38 26.6889L227.95 31.107H232.992L231.541 35.5652H226.499Z" fill="currentColor"/>
      <path d="M252.842 33.1307C254.232 34.8037 254.753 37.3784 253.762 40.414C252.792 43.4195 250.601 45.9842 248.129 47.6573C245.988 49.1199 243.097 50.272 239.405 50.272C235.713 50.272 233.572 49.1199 232.372 47.6573C230.981 45.9842 230.461 43.4195 231.441 40.414C232.432 37.3684 234.613 34.7937 237.094 33.1307C239.235 31.668 242.126 30.5159 245.818 30.5159C249.51 30.5159 251.651 31.668 252.852 33.1307H252.842ZM248.089 40.414C249.04 37.4987 247.459 35.1443 244.308 35.1443C241.156 35.1443 238.054 37.4987 237.104 40.414C236.184 43.2492 237.704 45.6436 240.896 45.6436C244.087 45.6436 247.169 43.2392 248.089 40.414Z" fill="currentColor"/>
      <path d="M260.695 31.117H266.188L265.287 33.9021C266.658 32.3192 268.079 31.5478 268.549 31.3274C269.57 30.8164 270.75 30.5159 272.051 30.5159C273.001 30.5159 273.692 30.7263 274.252 30.9467L271.941 35.8356C271.37 35.3647 270.72 35.1544 269.6 35.1544C268.559 35.1544 266.968 35.3647 265.468 36.6571C264.027 37.8994 263.467 39.4823 263.046 40.7747L260.155 49.691H254.662L260.685 31.127L260.695 31.117Z" fill="currentColor"/>
      <path d="M289.339 36.7673C288.499 35.7355 287.258 35.1444 285.367 35.1444C281.725 35.1444 279.054 37.669 278.174 40.3739C277.183 43.4195 278.844 45.6436 282.136 45.6436C283.356 45.6436 285.087 45.303 286.988 44.0106L285.327 49.1099C284.077 49.6209 282.156 50.262 279.905 50.262C276.843 50.262 274.502 49.15 273.261 47.5571C272.211 46.2247 271.34 43.9104 272.461 40.4341C273.521 37.1781 275.763 34.5633 278.284 32.8902C281.325 30.8766 284.197 30.4858 286.088 30.4858C288.109 30.4858 289.649 30.8665 290.99 31.5979L289.319 36.7373L289.339 36.7673Z" fill="currentColor"/>
      <path d="M309.919 44.4914C308.888 45.864 305.247 50.2821 298.453 50.2821C295.302 50.2821 293.191 49.4205 291.83 47.6673C290.29 45.7437 290.17 43.3393 291.12 40.424C292.321 36.7373 294.632 34.4631 296.453 33.1407C299.444 30.9967 302.295 30.5259 304.636 30.5259C308.598 30.5259 310.409 32.0286 311.26 33.5715C312.57 35.9258 311.89 38.8411 311.24 40.8648L311.1 41.2956H296.513C296.152 42.4076 296.072 43.6098 296.442 44.4213C296.773 45.1927 297.673 46.1845 299.784 46.1845C301.895 46.1845 303.736 45.2428 305.127 43.7401L309.919 44.5115V44.4914ZM306.998 37.9294C307.368 35.3948 305.597 34.2026 303.576 34.2026C301.555 34.2026 299.034 35.4449 297.773 37.9294H306.998Z" fill="currentColor"/>
      <path d="M64.6511 0H56.3171C54.9164 0 53.6658 0.901651 53.2356 2.24411L50.2842 11.3307H64.7411C72.0346 11.3307 77.9975 17.6824 78.2176 24.9757C78.4377 32.5596 72.3448 39.4322 64.8212 39.4322H43.5209C42.1203 39.4322 40.8697 40.3338 40.4395 41.6763L37.488 50.7629H64.8212C78.5778 50.7629 89.7432 38.8211 89.5331 24.9958C89.323 11.4209 78.2176 0 64.6511 0Z" fill="#4bcacb"/>
      <path d="M25.2021 22.6514H46.0121C47.4128 22.6514 48.6634 21.7498 49.0936 20.4073L52.045 11.3207H25.2921C11.7256 11.3207 0.210089 22.7416 -1.23621e-05 36.3164C-0.210113 50.1418 10.9553 62.0836 24.7119 62.0836H33.216C34.6166 62.0836 35.8672 61.182 36.2974 59.8395L39.2489 50.7529H24.7119C17.1883 50.7529 11.0953 43.8803 11.3154 36.2964C11.5355 28.993 17.9086 22.6514 25.2021 22.6514Z" fill="currentColor"/>
      <path d="M25.5223 31.137C23.6914 31.137 22.2307 32.7499 22.4708 34.6234C22.6709 36.1762 24.0616 37.2983 25.6323 37.2983H41.8501C42.9006 37.2983 43.8311 36.617 44.1612 35.6152L45.6119 31.127H25.5223V31.137Z" fill="currentColor"/>
      <path d="M63.8507 24.9657H47.6329C46.5824 24.9657 45.652 25.6469 45.3218 26.6488L43.8711 31.137H63.9608C65.7916 31.137 67.2523 29.524 67.0122 27.6506C66.8121 26.0978 65.4215 24.9757 63.8507 24.9757V24.9657Z" fill="#4bcacb"/>
      <path d="M54.176 57.4052H44.3613C44.2413 57.4052 44.1412 57.4853 44.1012 57.5955L43.5909 59.1884C43.5309 59.3687 43.671 59.5491 43.8511 59.5491H46.9926C47.1827 59.5491 47.3127 59.7294 47.2527 59.9097L43.8211 70.6494C43.761 70.8297 43.9011 71.0101 44.0812 71.0101H46.1122C46.2322 71.0101 46.3323 70.9299 46.3723 70.8197L49.914 59.7494C49.954 59.6392 50.0541 59.5591 50.1741 59.5591H53.6658C53.7858 59.5591 53.8859 59.4789 53.9259 59.3687L54.4362 57.7758C54.4962 57.5955 54.3561 57.4152 54.176 57.4152V57.4052Z" fill="currentColor"/>
      <path d="M88.0723 61.683H86.0914C86.0214 61.683 85.9613 61.703 85.9113 61.7531L81.6192 65.4599L84.0804 57.7658C84.1404 57.5855 84.0004 57.4052 83.8203 57.4052H81.7893C81.6693 57.4052 81.5692 57.4853 81.5292 57.5955L77.3572 70.6394C77.2972 70.8197 77.4372 71 77.6173 71H79.6483C79.7683 71 79.8684 70.9199 79.9084 70.8097L81.209 66.7423L82.9699 70.8297C83.0099 70.9299 83.1099 71 83.22 71H85.7712C85.9713 71 86.1014 70.7997 86.0214 70.6193L83.9804 65.8606L88.2624 62.1639C88.4525 61.9936 88.3325 61.683 88.0823 61.683H88.0723Z" fill="currentColor"/>
      <path d="M74.3557 63.8269H77.7674C77.8874 63.8269 77.9875 63.7468 78.0275 63.6366L78.5477 62.0436C78.6078 61.8633 78.4777 61.683 78.2876 61.683H74.3957C71.8745 61.683 69.7135 63.6466 69.6334 66.1712C69.5534 68.6958 71.6544 70.99 74.2757 70.99H75.4462C75.5663 70.99 75.6663 70.9099 75.7064 70.7997L76.2266 69.2068C76.2866 69.0264 76.1566 68.8461 75.9665 68.8461H74.2857C72.775 68.8461 71.5844 67.5036 71.8045 65.9608C71.9846 64.7185 73.1151 63.8269 74.3657 63.8269H74.3557Z" fill="currentColor"/>
      <path d="M57.7478 61.683C57.0775 61.693 55.9369 61.9334 55.1365 63.0555L55.5467 61.7731C55.6067 61.5928 55.4667 61.4125 55.2866 61.4125H53.4357C53.3156 61.4125 53.2156 61.4926 53.1756 61.6028L50.2842 70.6394C50.2242 70.8197 50.3642 71 50.5443 71H52.5753C52.6953 71 52.7954 70.9199 52.8354 70.8097L54.3561 66.0409C55.4267 64.1976 56.6673 63.9872 57.8078 63.9672C57.9078 63.9672 57.9979 63.9171 58.0379 63.8269L59.0384 62.0737C59.1384 61.8934 59.0184 61.673 58.8183 61.673C58.6182 61.673 57.9979 61.673 57.7478 61.673V61.683Z" fill="currentColor"/>
      <path d="M69.1632 62.0336C69.2232 61.8533 69.0932 61.673 68.9031 61.673H63.7606C61.2394 61.673 59.0784 63.6466 58.9983 66.1712C58.9083 68.8161 61.0193 70.99 63.6406 70.99H66.0617C66.1818 70.99 66.2818 70.9099 66.3218 70.7997L69.1632 62.0336ZM61.1694 65.9608C61.3495 64.7185 62.48 63.8269 63.7306 63.8269H66.0017C66.1918 63.8269 66.3218 64.0072 66.2618 64.1876L64.8111 68.6658C64.7711 68.776 64.671 68.8561 64.551 68.8561H63.6406C62.1298 68.8561 60.9393 67.5137 61.1594 65.9708L61.1694 65.9608Z" fill="currentColor"/>
    </svg>
  )
}

export function SignIn() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const currentLang = i18n.language?.startsWith('ja') ? 'ja' : 'en'

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />
  }

  const toggleLanguage = () => {
    const next = currentLang === 'en' ? 'ja' : 'en'
    i18n.changeLanguage(next)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (signIn(username, password)) {
      navigate('/dashboard', { replace: true })
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-primary-900">
      {/* Background gradient overlay */}
      <div className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #051224 0%, #10366b 45%, #15478e 75%, #051224 100%)',
        }}
      />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-[420px] mx-4">
        {/* Logo + Branding */}
        <div className="text-center mb-8">
          <LogoWorkforce className="h-8 w-auto mx-auto mb-3 text-white" />
          <p className="text-sm text-primary-200/70 mt-1">{t('auth.sign_in_desc')}</p>
        </div>

        {/* Sign In Card */}
        <div className="bg-white rounded-xl shadow-2xl shadow-black/20 border border-neutral-100">
          <div className="p-8">
            <h2 className="text-lg font-semibold text-neutral-900 mb-6">{t('auth.sign_in')}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label={t('auth.username')}
                type="text"
                icon={User}
                placeholder="admin"
                value={username}
                onChange={e => { setUsername(e.target.value); setError(false) }}
                autoComplete="username"
              />

              <Input
                label={t('auth.password')}
                type="password"
                icon={Lock}
                placeholder="••••••••"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(false) }}
                autoComplete="current-password"
              />

              {error && (
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-negative-50 border border-negative-200">
                  <AlertCircle size={14} className="text-negative-600 shrink-0" />
                  <span className="text-caption text-negative-700">{t('auth.invalid_credentials')}</span>
                </div>
              )}

              <Button type="submit" className="w-full h-10 mt-2" size="lg">
                {t('auth.sign_in')}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-neutral-200" />
              <span className="text-caption text-neutral-400 font-medium">{t('auth.or')}</span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            {/* Social Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full h-10 flex items-center justify-center gap-2.5 rounded-lg border border-neutral-200 bg-white text-body font-medium text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 transition-micro"
              >
                <Chrome size={18} className="text-neutral-500" />
                {t('auth.continue_with')} Google
              </button>
              <button
                type="button"
                className="w-full h-10 flex items-center justify-center gap-2.5 rounded-lg border border-neutral-200 bg-white text-body font-medium text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 transition-micro"
              >
                <KeyRound size={18} className="text-neutral-500" />
                {t('auth.continue_with')} Track ID
              </button>
            </div>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="flex items-center justify-center mt-6">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-caption font-medium text-primary-200/70 hover:text-white hover:bg-white/10 transition-micro"
          >
            <Globe size={14} />
            <span className={cn(currentLang === 'en' && 'text-white')}>EN</span>
            <span className="text-primary-300/40">/</span>
            <span className={cn(currentLang === 'ja' && 'text-white')}>JA</span>
          </button>
        </div>
      </div>
    </div>
  )
}
