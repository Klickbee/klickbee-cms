import { Contact } from "@/feature/contact/types/contact";

export const mockContacts: Contact[] = [
	{
		content: {
			company: {
				type: "text",
				value: "Tech Solutions SARL",
			},
			cv: {
				filename: "CV_Alice_Dupont.pdf",
				type: "file",
				url: "/uploads/mock/cv-alice-dupont.pdf",
			},
			message: {
				type: "text",
				value: "Bonjour, j'aimerais obtenir plus d'informations sur vos services de développement web. Pouvez-vous me contacter ?",
			},
			subject: {
				type: "text",
				value: "Demande d'information sur vos services",
			},
		},
		createdAt: new Date("2024-01-15T14:30:00Z"),
		email: "alice.dupont@example.com",
		id: 1,
		name: "Alice Dupont",
		number: "+33 1 23 45 67 89",
		submitDate: new Date("2024-01-15T14:30:00Z"),
	},
	{
		content: {
			company: {
				type: "text",
				value: "Innovation Corp",
			},
			message: {
				type: "text",
				value: "Nous sommes intéressés par une collaboration pour notre prochain projet. Quand pourrions-nous planifier un appel ?",
			},
			project_brief: {
				filename: "Brief_Projet_Innovation.docx",
				type: "file",
				url: "/uploads/mock/brief-projet-innovation.docx",
			},
			subject: {
				type: "text",
				value: "Collaboration possible",
			},
		},
		createdAt: new Date("2024-01-14T10:15:00Z"),
		email: "jean.martin@example.fr",
		id: 2,
		name: "Jean Martin",
		number: "+33 6 78 90 12 34",
		submitDate: new Date("2024-01-14T10:15:00Z"),
	},
	{
		content: {
			message: {
				type: "text",
				value: "J'ai remarqué un problème sur votre site web. La page de contact ne se charge pas correctement sur mobile.",
			},
			screenshot: {
				filename: "bug_screenshot_mobile.png",
				type: "file",
				url: "/uploads/mock/bug-screenshot-mobile.png",
			},
			subject: {
				type: "text",
				value: "Bug report",
			},
			urgency: {
				type: "text",
				value: "high",
			},
		},
		createdAt: new Date("2024-01-13T16:45:00Z"),
		email: "marie.bernard@example.com",
		id: 3,
		name: "Marie Bernard",
		number: "+33 2 34 56 78 90",
		submitDate: new Date("2024-01-13T16:45:00Z"),
	},
	{
		content: {
			budget: {
				type: "text",
				value: "5000-10000€",
			},
			cahier_des_charges: {
				filename: "Cahier_des_charges_site_vitrine.pdf",
				type: "file",
				url: "/uploads/mock/cahier-des-charges.pdf",
			},
			exemples_sites: {
				filename: "Exemples_sites_references.zip",
				type: "file",
			},
			message: {
				type: "text",
				value: "Nous souhaitons refaire notre site vitrine. Pouvez-vous nous envoyer un devis pour un site de 5 pages ?",
			},
			subject: {
				type: "text",
				value: "Demande de devis",
			},
			timeline: {
				type: "text",
				value: "3 mois",
			},
		},
		createdAt: new Date("2024-01-12T09:20:00Z"),
		email: "pierre.leroy@example.fr",
		id: 4,
		name: "Pierre Leroy",
		number: "+33 5 67 89 01 23",
		submitDate: new Date("2024-01-12T09:20:00Z"),
	},
	{
		content: {
			documentation_technique: {
				filename: "Architecture_systeme_existant.pdf",
				type: "file",
				url: "/uploads/mock/architecture-systeme.pdf",
			},
			logs: {
				filename: "logs_erreurs.txt",
				type: "file",
				url: "/uploads/mock/logs-erreurs.txt",
			},
			message: {
				type: "text",
				value: "J'ai des questions sur l'intégration de votre CMS avec notre système existant. Est-ce que vous proposez du support technique ?",
			},
			subject: {
				type: "text",
				value: "Question technique",
			},
			technical_level: {
				type: "text",
				value: "advanced",
			},
		},
		createdAt: new Date("2024-01-11T13:10:00Z"),
		email: "sophie.durand@example.com",
		id: 5,
		name: "Sophie Durand",
		number: "+33 4 45 67 89 01",
		submitDate: new Date("2024-01-11T13:10:00Z"),
	},
	{
		content: {
			message: {
				type: "text",
				value: "Je préfère ne pas donner mon email pour cette demande.",
			},
			subject: {
				type: "text",
				value: "Demande anonyme",
			},
		},
		createdAt: new Date("2024-01-10T08:45:00Z"),
		email: null,
		id: 6,
		name: "Contact Anonyme",
		number: "+33 1 98 76 54 32",
		submitDate: new Date("2024-01-10T08:45:00Z"),
	},
	{
		content: {
			message: {
				type: "text",
				value: "Juste un email sans nom ni téléphone.",
			},
			subject: {
				type: "text",
				value: "Contact partiel",
			},
		},
		createdAt: new Date("2024-01-09T15:20:00Z"),
		email: "contact.partiel@example.com",
		id: 7,
		name: null,
		number: null,
		submitDate: new Date("2024-01-09T15:20:00Z"),
	},
];

export const getMockContactById = (id: number): Contact | undefined => {
	return mockContacts.find((contact) => contact.id === id);
};
