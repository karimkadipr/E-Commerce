import React from 'react'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'
import './styles/Footer.css'

function Footer() {
  return (
    <div className='big'>
      <div className='Footer'>
        <a href='https://www.facebook.com/karim.kadi.54'>
          <FacebookIcon />
        </a>
        <a href='https://twitter.com/KadiKarim97'>
          <TwitterIcon />
        </a>
        <a href='https://www.linkedin.com/in/karim-kadi-282bb9202/'>
          <LinkedInIcon />
        </a>
        <a href='https://github.com/karimkadipr'>
          <GitHubIcon />
        </a>
      </div>
      <p>Designed by Karim</p>
    </div>
  )
}

export default Footer
