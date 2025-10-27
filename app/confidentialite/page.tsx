import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function ConfidentialitePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <h1 className="mb-8 text-4xl font-bold">Politique de Confidentialité</h1>

          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">1. Collecte des données</h2>
              <p className="text-muted-foreground">
                Nous collectons les informations que vous nous fournissez lors de votre inscription et de vos commandes,
                notamment : nom, prénom, adresse email, numéro de téléphone, adresse de livraison, et informations de
                paiement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">2. Utilisation des données</h2>
              <p className="text-muted-foreground">Vos données sont utilisées pour :</p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Traiter et livrer vos commandes</li>
                <li>Communiquer avec vous concernant vos commandes</li>
                <li>Améliorer nos services</li>
                <li>Vous envoyer des informations promotionnelles (avec votre consentement)</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">3. Partage des données</h2>
              <p className="text-muted-foreground">
                Nous partageons vos données uniquement avec nos partenaires nécessaires à la fourniture de nos services
                : pharmacies partenaires pour la préparation des commandes, GoZem pour la livraison, et prestataires de
                paiement pour le traitement des transactions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">4. Sécurité des données</h2>
              <p className="text-muted-foreground">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger
                vos données contre tout accès non autorisé, modification, divulgation ou destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">5. Vos droits</h2>
              <p className="text-muted-foreground">Vous disposez des droits suivants concernant vos données :</p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification des données inexactes</li>
                <li>Droit à l'effacement de vos données</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité de vos données</li>
                <li>Droit d'opposition au traitement</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">6. Cookies</h2>
              <p className="text-muted-foreground">
                Nous utilisons des cookies pour améliorer votre expérience sur notre plateforme. Vous pouvez gérer vos
                préférences de cookies dans les paramètres de votre navigateur.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">7. Conservation des données</h2>
              <p className="text-muted-foreground">
                Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services et
                respecter nos obligations légales.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">8. Modifications</h2>
              <p className="text-muted-foreground">
                Nous pouvons modifier cette politique de confidentialité à tout moment. Les modifications seront
                publiées sur cette page avec une date de mise à jour.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">9. Contact</h2>
              <p className="text-muted-foreground">
                Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, contactez
                notre délégué à la protection des données à l'adresse privacy@boltpharma.com.
              </p>
            </section>

            <p className="mt-8 text-sm text-muted-foreground">Dernière mise à jour : Janvier 2025</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
