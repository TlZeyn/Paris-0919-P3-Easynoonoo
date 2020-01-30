import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator'
import './ResultCharges.css'

const ResultCharges = ({ results }) => {
    return (
        <div className='container-fluid'>
            <p>MAQUETTE</p>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Ma part</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Salaire perçu par la nounou</th>
                        <td>{Math.round(results.netMensuelFamilleA)}</td>
                        <td>{Math.round(results.netMensuelTotal)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Mon coût mensuel</th>
                        <td>{Math.round(results.coutPatronalFamilleA)}</td>
                    </tr>
                </tbody>
            </table>

            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Heure</th>
                        <th scope="col">Mois</th>
                        <th scope="col">Année</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Salaire brut</th>
                        <td>/</td>
                        <td>{Math.round(results.brutMensuelFamilleA)}</td>
                        <td>{Math.round(results.brutAnnuelFamilleA)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Salaire net</th>
                        <td>/</td>
                        <td>{Math.round(results.netMensuelFamilleA)}</td>
                        <td>{Math.round(results.netAnnuelFamilleA)}</td>
                    </tr>
                    <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">Coût net de crédit et aides</th>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">Coût</th>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">Salaire</th>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">Repas</th>
                        <td>/</td>
                        <td>{Math.round(results.primePanierRepasFamilleA)}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">Transports</th>
                        <td>/</td>
                        <td>{Math.round(results.remboursementMensuelTransportFamilleA)}</td>
                        <td>{Math.round(results.remboursementMensuelTransportFamilleA * 12)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Charges patronales</th>
                        <td>/</td>
                        <td>{Math.round(results.chargesPatronalesFamilleA)}</td>
                        <td>{Math.round(results.chargesPatronalesFamilleA * 12)}</td>
                    </tr>
                    <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">Crédits</th>
                        <td>/</td>
                        <td>{Math.round(results.creditImpotMensuelFamilleA)}</td>
                        <td>{Math.round(results.creditImpotAnnuelFamilleA)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Déduction forfaitaire des charges</th>
                        <td>/</td>
                        <td>{Math.round(results.deductionForfaitaireChargesSocialesFamilleA)}</td>
                        <td>{Math.round(results.deductionForfaitaireChargesSocialesFamilleA * 12)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Aide Paje pour les charges</th>
                        <td>/</td>
                        <td>{Math.round(results.aidesPajeFamilleA)}</td>
                        <td>{Math.round(results.aidesPajeFamilleA * 12)}</td>
                    </tr>
                    <tr>
                        <th scope="row">CMG</th>
                        <td>/</td>
                        <td>{Math.round(results.cmgFamilleA)}</td>
                        <td>{Math.round(results.cmgFamilleA * 12)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Aides additionnelles</th>
                        <td>/</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">Crédit d'impôts</th>
                        <td>/</td>
                        <td>{Math.round(results.creditImpotMensuelFamilleA)}</td>
                        <td>{Math.round(results.creditImpotAnnuelFamilleA)}</td>
                    </tr>
                </tbody>
            </table>

            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Hypothèses modifiables</th>
                        <th scope="col"></th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Panier repas</th>
                        <input type='number'></input>
                    </tr>
                    <tr>
                        <th scope="row">Nb jours travaillés par semaine</th>
                        <input type='number'></input>
                    </tr>
                    <tr>
                        <th scope="row">Abonnement transports publics</th>
                        <input type='number'></input>
                    </tr>
                    <tr>
                        <th scope="row"></th>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">Part garde</th>
                        <input type='number'></input>
                    </tr>
                    <tr>
                        <th scope="row">1ère année d'emploi d'un salarié à domicile</th>
                        <select class="form-control form-control-lg">
                            <option value={true}>oui</option>
                            <option value={false}>non</option>
                        </select>
                    </tr>
                    <tr className='align-items-center'>
                        <th scope="row">Garde alternée</th>
                        <select class="form-control form-control-lg">
                            <option value={true}>oui</option>
                            <option value={false}>non</option>
                        </select>
                    </tr>
                </tbody>
            </table>

            {/* <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Heures</th>
                                                
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Totales</th>
                        <td></td>                        
                    </tr>
                    <tr>
                        <th scope="row">Normales</th>
                        <td></td>                       
                    </tr> 
                    <tr>
                        <th scope="row">Dont présence responsable</th>
                        <td></td>                       
                    </tr>
                    <tr>
                        <th scope="row">Supplémentaires</th>
                        <td></td>                       
                    </tr>                     
                </tbody>
            </table> */}



            {/* <Link to="/">
                 <p className="simFormReturn">Retour aux simulateurs</p>
            </Link> */}
        </div>
    )
}

export default ResultCharges;