import React from 'react'
import Header from './Header'
import contract from '../../src/assets/contract.png'
import money2 from '../../src/assets/money2.png'
import calendar from '../../src/assets/calendar.png'
import './Home.css'

const Home = () => {

    return (
        <div className='Homepage'>

            {/* Description */}

            <article className='description'>
                <div className='vision'>
                    <h2>Notre vision</h2>
                    <p>
                        Les parents font appel à des nounous pour garder leurs enfants, pas pour être employeur. Notre plateforme est là pour sécuriser et simplifier le rôle d'employeur et se concentrer sur ce qui compte: les enfants.
                    </p>
                </div>

                <div className='mission'>
                    <h2>Notre mission</h2>
                    <p>
                        Fournir tous les outils nécessaire aux parents pour gérer administrativement la nounou, de la rédaction à la rupture du contrat, dans un environnement simple et avec le minimun d'interaction de leur part. Les parents emploient une nounou pour se faciliter la vie, nous les aidons à atteindre à cet objectif.
                    </p>
                </div>
            </article>


            {/* Teaser/ Screenshots from app */}

            <h2>Aperçu</h2>

            <div className='screen1'>
                <img className='screenshot1' src='https://via.placeholder.com/650/000000/FFFFFF/?text=easynoonoo.com ' alt='screenshot for the easynoonoo website'>
                </img>
                <div className='desc1'>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"
                    </p>
                    <p>
                        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusant"
                    </p>
                </div>
            </div>

            <div className='screen1'>
                
                <div className='desc1'>
                    <p>
                        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusant"
                    </p>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"
                    </p>
                    
                </div>
                <img className='screenshot1' src='https://via.placeholder.com/650/000000/FFFFFF/?text=easynoonoo.com ' alt='screenshot for the easynoonoo website'>
                </img>
            </div>

            {/* <div className='screen2'>
                <div className='desc2'>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </p>
                    <p>
                        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
                    </p>
                </div>
                <img className='screenshot2' src='https://via.placeholder.com/650/687189/FFFFFF/?text=easynoonoo.com ' alt='screenshot for the easynoonoo website'>
                </img>
            </div> */}


            {/* SIMULATEUR */}


            <h2 className ='h2Simulateur'>Besoin d'aide ?</h2>

            <div className='simulateur'>
                
                
                {/* <div className='simulateurIcon'>
                    <img className='contract' src={contract} alt='contract'></img>
                    <img className='money2' src={money2} alt='money2'></img>
                    <img className='calendar' src={calendar} alt='calendar'></img>
                </div>         */}

                <div className='simulateurDescription'>
                    <h3>Calculer mon taux de répartition</h3>
                    <p> "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusant" </p>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"
                    </p>                
                    <input type='button' className='simulateurbtn1' value='Essayer' />
                </div>

                
                <div className='simulateurDescription2'>
                    <h3>Calculer les coûts de ma nounou</h3>
                    <p> "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusant" </p>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"
                    </p>                
                    <input type='button' className='simulateurbtn2' value='Essayer' />
                </div>
                        
            </div>

        </div>
    )
}


export default Home