const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const { tauxChargesEmployes } = require('./models/chargesEmployes')
const { tauxChargesEmployeurs } = require('./models/chargesEmployeurs')

const port = 4000

const app = express()
app.use(cors())
app.use(bodyParser.json())

// ____________ REMOTE DB ROUTE ______________

const dbRoute =
  'mongodb+srv://easynoonoo:easynoonoo@cluster0-mznsf.azure.mongodb.net/easynoonooDB?retryWrites=true&w=majority'

// ____________ CHECK YOUR CONNECTION TO MONGO DB REMOTE ______________

mongoose
  .connect(dbRoute, { useNewUrlParser: true })
  .then(() => console.log('DB connected'))
  .catch(error => console.log(error))

/*    TAUX EMPLOYES    */

const results = []

app.post('/api/taux/employes', function (req, res) {

   /*--------------CALCUL SALAIRE BRUT-------------*/
   const tauxHeuresSupp = 1.25
   const heuresMensuelles = Math.ceil(
     req.body.heuresHebdo * (52 / 12),
   )
   const heuresMensuellesMajorees = Math.ceil(
     req.body.heuresSup * (52 / 12),
   )
   let salaireBrutMensuel =
     heuresMensuelles * req.body.tauxHoraire +
     heuresMensuellesMajorees *
     req.body.tauxHoraire *
     tauxHeuresSupp
   brutMensuelFamilleA = req.body.repartitionFamille * salaireBrutMensuel
   brutMensuelFamilleB = (1 - req.body.repartitionFamille) * salaireBrutMensuel

   /*--------------------------------------------------*/


   /*--------------CALCUL ASSIETTE CSG RDS-------------*/
   const PMSS = 3377
   let assietteCsgRdsMensuel =
     98.25 * 0.01 * Math.min(4 * PMSS, salaireBrutMensuel) +
     Math.max(0, salaireBrutMensuel - 4 * PMSS)

   let assietteCsgRdsHoraire = 98.25 * 0.01 * req.body.tauxHoraire

   /*--------------------------------------------------*/

   /*--------------CALCUL SALAIRE NET-------------*/

   const arrayTr = []

  tauxChargesEmployes.find(
    { dateDebutAnnee: req.body.dateDebutAnnee },
    function (err, taux) {
      taux.map(val => {
        if (req.body.trancheA && req.body.alsaceMoselle) {
          arrayTr.push(
            val.IrcemRetraiteComplementaireTrA,
            val.CegTrA,
            0,
            val.cotisationSupplementaireAlsaceMoselle
          )
        } else if (req.body.trancheA && req.body.alsaceMoselle == false) {
          arrayTr.push(
            val.IrcemRetraiteComplementaireTrA,
            val.CegTrA,
            0,
            0
          )
        }
        else if (req.body.trancheB && req.body.alsaceMoselle) {
          arrayTr.push(
            val.IrcemRetraiteComplementaireTrA,
            val.CegTrA,
            0,
            val.cotisationSupplementaireAlsaceMoselle
          )
        }
        else {
          arrayTr.push(
            val.IrcemRetraiteComplementaireTrB,
            val.CegTrB,
            val.CetTrB,
            0
          )
        }
        let netHoraire = req.body.tauxHoraire -
          ((req.body.tauxHoraire * 0.01 * (
            val.maladieMaterniteInvaliditeDeces +
            val.assuranceVieillesseDeplafonnee +
            val.vieillessePlafonnee +
            arrayTr[3] +
            arrayTr[0] +
            arrayTr[1] +
            arrayTr[2] +
            val.assuranceChomage +
            val.IrcemPrevoyance))
            + (assietteCsgRdsHoraire * 0.01 * (
              val.CsgDeductible +
              val.CsgNonDeductible +
              val.CrdsNonDeductible)))

        let chargesTotal =
          (salaireBrutMensuel * 0.01 * (
            val.maladieMaterniteInvaliditeDeces +
            val.assuranceVieillesseDeplafonnee +
            val.vieillessePlafonnee +
            arrayTr[3] +
            arrayTr[0] +
            arrayTr[1] +
            arrayTr[2] +
            val.assuranceChomage +
            val.IrcemPrevoyance))
          + (assietteCsgRdsMensuel * 0.01 * (
            val.CsgDeductible +
            val.CsgNonDeductible +
            val.CrdsNonDeductible))
          + (heuresMensuellesMajorees * tauxHeuresSupp * req.body.tauxHoraire * (0.01 * val.exonerationDesCotisations))

        let netMensuelTotal = salaireBrutMensuel - chargesTotal
        let netMensuelFamilleA = (netMensuelTotal * req.body.repartitionFamille)
        let netMensuelFamilleB = (netMensuelTotal * (1 - req.body.repartitionFamille))
        let brutAnnuelTotal = salaireBrutMensuel * 12
        let netAnnuelTotal = netMensuelTotal * 12
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({
          "brutMensuelFamilleA": brutMensuelFamilleA,
          "netMensuelFamilleA": netMensuelFamilleA,
          "brutMensuelFamilleB": brutMensuelFamilleB,
          "netMensuelFamilleB": netMensuelFamilleB,
          "brutHoraireTotal": req.body.tauxHoraire,
          "netHoraireTotal": netHoraire,
          "netMensuelTotal": netMensuelTotal,
          "brutMensuelTotal": salaireBrutMensuel,
          "netAnnuelTotal": netAnnuelTotal,
          "brutAnnuelTotal": brutAnnuelTotal
        }))
      })
    },
  )

  tauxChargesEmployeurs.find(
    { dateDebutAnnee: req.body.dateDebutAnnee },
    function (err, taux) {
      console.log('test')
      const arrayTr = []
      taux.map(val => {
        if (req.body.trancheA) {
          arrayTr.push(
            val.IrcemRetraiteComplementaireTrA,
            val.CegTrA,
            0,

          )
        }
        else {
          arrayTr.push(
            val.IrcemRetraiteComplementaireTrB,
            val.CegTrB,
            val.CetTrB,

          )
        }
        let chargesPatronales =
          salaireBrutMensuel * 0.01 * (
            val.maladieMaterniteInvaliditeDeces +
            val.assuranceVieillesseDeplafonnee +
            val.vieillessePlafonnee +
            val.accidentDuTravail +
            val.allocationsFamiliales +
            arrayTr[0] +
            arrayTr[1] +
            arrayTr[2] +
            val.assuranceChomage +
            val.IrcemPrevoyance +
            val.contributionSolidariteAutonomie +
            val.formationProfessionnelle +
            val.fondsNationalAideAuLogement +
            val.contributionAuFinancementDesOrganisationsSyndicales
          )
          res.end(JSON.stringify({"chargesPatronales" : chargesPatronales}))
        })
    }
  )
}
)

// _______ APP LISTEN _______

app.listen(port, err => {
  if (err) {
    throw new Error('something bad happened...')
  }
  console.log(`server is listening on ${port}`)
})
