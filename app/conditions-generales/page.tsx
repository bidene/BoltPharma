import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function ConditionsGeneralesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <h1 className="mb-8 text-4xl font-bold">Conditions Générales d'Utilisation</h1>

          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">1. Objet</h2>
              <p className="text-muted-foreground">
                Les présentes conditions générales d'utilisation (CGU) régissent l'utilisation de la plateforme
                BoltPharma, accessible à l'adresse www.boltpharma.com. En utilisant notre plateforme, vous acceptez sans
                réserve les présentes CGU.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">2. Services proposés</h2>
              <p className="text-muted-foreground">
                BoltPharma est une plateforme de mise en relation entre les pharmacies partenaires et les clients pour
                l'achat et la livraison de médicaments au Bénin. Nous facilitons la commande en ligne et assurons la
                livraison rapide via notre partenaire GoZem.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">3. Inscription et compte utilisateur</h2>
              <p className="text-muted-foreground">
                Pour passer commande, vous devez créer un compte en fournissant des informations exactes et à jour. Vous
                êtes responsable de la confidentialité de vos identifiants de connexion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">4. Commandes et paiements</h2>
              <p className="text-muted-foreground">
                Les commandes sont confirmées après validation du paiement. Nous acceptons les paiements par mobile
                money (MTN, MOOV, CELTIS). Les prix sont indiqués en Francs CFA (XOF) et incluent toutes les taxes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">5. Livraison</h2>
              <p className="text-muted-foreground">
                La livraison est assurée par notre partenaire GoZem. Les délais de livraison sont généralement de 30 à
                60 minutes selon votre localisation. Des frais de livraison peuvent s'appliquer selon la distance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">6. Médicaments sur ordonnance</h2>
              <p className="text-muted-foreground">
                Pour les médicaments nécessitant une ordonnance, vous devez télécharger une copie valide de votre
                ordonnance lors de la commande. La pharmacie se réserve le droit de refuser toute commande sans
                ordonnance valide.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">7. Retours et remboursements</h2>
              <p className="text-muted-foreground">
                En raison de la nature des produits pharmaceutiques, les retours ne sont acceptés qu'en cas d'erreur de
                livraison ou de produit défectueux. Contactez notre service client dans les 24 heures suivant la
                réception.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">8. Protection des données</h2>
              <p className="text-muted-foreground">
                Vos données personnelles sont traitées conformément à notre politique de confidentialité. Nous nous
                engageons à protéger vos informations et à ne les utiliser que dans le cadre de nos services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">9. Responsabilité</h2>
              <p className="text-muted-foreground">
                BoltPharma agit en tant qu'intermédiaire entre les pharmacies et les clients. Nous ne sommes pas
                responsables de la qualité des produits fournis par les pharmacies partenaires, mais nous nous engageons
                à travailler uniquement avec des pharmacies agréées.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">10. Modification des CGU</h2>
              <p className="text-muted-foreground">
                Nous nous réservons le droit de modifier les présentes CGU à tout moment. Les modifications entrent en
                vigueur dès leur publication sur la plateforme.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">11. Contact</h2>
              <p className="text-muted-foreground">
                Pour toute question concernant ces conditions générales, vous pouvez nous contacter à l'adresse
                contact@boltpharma.com ou par téléphone au +229 97 00 00 00.
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
