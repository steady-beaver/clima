import React from 'react';
import styles from './TechCard.module.css';





const TechCard = ({ href, src, alt }) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={ "col s12 m3 " + styles.TechCardClass}>
            <img src={src} alt={alt} title={alt} />
        </a>
    )
}

export default TechCard
