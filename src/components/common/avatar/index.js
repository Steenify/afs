import React from 'react'
import './style.scss'

export default ({ src }) => (
    <div className="avatar">
        <img src={src} alt="company_avatar" className="w-100 h-100" />
    </div>
)