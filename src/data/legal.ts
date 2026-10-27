// Mentions légales et confidentialité (/mentions-legales).
// À COMPLÉTER : tant qu'un champ est vide, la page affiche « À compléter » à sa place.
// Les infos de l'entreprise sont sur l'extrait Kbis ou sur annuaire-entreprises.data.gouv.fr.
export const legal = {
  company: 'SAS VIALA', // raison sociale, ex. « SLICE »
  legalForm: 'SARL', // ex. « SAS », « SARL », « EI »
  capital: '1000€', // ex. « 1 000 € » (sauf entreprise individuelle)
  address: '43 RUE CARNOT 43-45, 84000 AVIGNON', // siège social, ex. « 45 rue Carnot, 84000 Avignon »
  siret: '90341441500013', // 14 chiffres
  rcs: 'RCS Avignon 903 414 415', // ex. « RCS Avignon 123 456 789 »
  vat: 'FR13903414415', // n° de TVA intracommunautaire, ex. « FR12 123456789 »
  publisher: 'Rémi Viala - SAS VIALA', // directeur de la publication : prénom et nom
  host: {
    name: 'Hostinger International Ltd', // ex. « Netlify, Inc. »
    address: '61 Lordou Vironos Street, 6023 Larnaca, Chypre', // adresse postale de l'hébergeur
    // Hostinger ne publie pas de numéro de téléphone : contact par email (conditions générales, section 24).
    contact: 'compliance@hostinger.com',
    website: 'https://www.hostinger.fr',
  },
  photos: 'SAS VIALA', // crédit photo, ex. « Slice » ou le nom du photographe
  updated: '26 octobre 2026', // date de dernière mise à jour, ex. « 27 octobre 2026 »
};
