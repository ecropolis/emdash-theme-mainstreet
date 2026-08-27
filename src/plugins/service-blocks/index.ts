/**
 * Service blocks plugin (inline, theme-local).
 *
 * Registers the block types a service business assembles its pages from:
 * hero, services grid, steps, testimonials, team, hours & contact, FAQ,
 * and a booking CTA banner. Editors insert them in the admin's Portable
 * Text editor; they render via src/components/blocks/* (dispatched from
 * ServiceBlocks.astro).
 *
 * Constraints worth knowing (same as the official templates):
 *
 * - Block Kit has no "object group" element, so nested object shapes (e.g. a
 *   CTA's { label, url }) are flattened to sibling fields like ctaLabel and
 *   ctaUrl. The site-side renderer reads the flat keys.
 * - Repeater sub-fields are scalar only: text_input, number_input, select,
 *   toggle. Nested repeaters are not allowed.
 * - There is no media picker element in the editor's plugin-block modal yet,
 *   so image fields (hero image) are URL strings entered by hand.
 *
 * The services and team blocks carry no item data themselves -- they are
 * placement markers plus a headline. Their renderers query the `services`
 * and `team` collections, so editors manage those items as real content
 * entries, not block fields.
 */

import { definePlugin } from "emdash";
import type { PluginDefinition } from "emdash";

const definition: PluginDefinition = {
	id: "service-blocks",
	version: "0.1.0",

	admin: {
		portableTextBlocks: [
			{
				type: "service.hero",
				label: "Hero",
				category: "Sections",
				description: "Big welcome section with booking CTA",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{
						type: "text_input",
						action_id: "subheadline",
						label: "Subheadline",
						multiline: true,
					},
					{ type: "text_input", action_id: "badge", label: "Badge (small text above headline)" },
					{ type: "text_input", action_id: "primaryCtaLabel", label: "Primary CTA label" },
					{ type: "text_input", action_id: "primaryCtaUrl", label: "Primary CTA URL" },
					{
						type: "text_input",
						action_id: "secondaryCtaLabel",
						label: "Secondary CTA label",
					},
					{ type: "text_input", action_id: "secondaryCtaUrl", label: "Secondary CTA URL" },
					{ type: "text_input", action_id: "imageUrl", label: "Image URL" },
					{ type: "text_input", action_id: "imageAlt", label: "Image alt text" },
					{ type: "toggle", action_id: "centered", label: "Center the layout (no image)" },
				],
			},

			{
				type: "service.services",
				label: "Services",
				category: "Sections",
				description: "Grid of services from the Services collection",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{
						type: "text_input",
						action_id: "subheadline",
						label: "Subheadline",
						multiline: true,
					},
					{
						type: "number_input",
						action_id: "limit",
						label: "Max services to show (0 = all)",
					},
					{ type: "toggle", action_id: "featuredOnly", label: "Featured services only" },
					{ type: "text_input", action_id: "ctaLabel", label: "Link label under grid" },
					{ type: "text_input", action_id: "ctaUrl", label: "Link URL under grid" },
				],
			},

			{
				type: "service.steps",
				label: "Steps",
				category: "Sections",
				description: "Numbered how-it-works steps",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{
						type: "text_input",
						action_id: "subheadline",
						label: "Subheadline",
						multiline: true,
					},
					{
						type: "repeater",
						action_id: "steps",
						label: "Steps",
						item_label: "Step",
						min_items: 2,
						max_items: 6,
						fields: [
							{ type: "text_input", action_id: "title", label: "Title" },
							{
								type: "text_input",
								action_id: "description",
								label: "Description",
								multiline: true,
							},
						],
					},
				],
			},

			{
				type: "service.testimonials",
				label: "Testimonials",
				category: "Sections",
				description: "Client testimonial cards",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{
						type: "repeater",
						action_id: "testimonials",
						label: "Testimonials",
						item_label: "Testimonial",
						min_items: 1,
						fields: [
							{ type: "text_input", action_id: "quote", label: "Quote", multiline: true },
							{ type: "text_input", action_id: "author", label: "Client name" },
							{
								type: "text_input",
								action_id: "detail",
								label: "Detail (e.g. service or since-when)",
							},
						],
					},
				],
			},

			{
				type: "service.team",
				label: "Team",
				category: "Sections",
				description: "Grid of people from the Team collection",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{
						type: "text_input",
						action_id: "subheadline",
						label: "Subheadline",
						multiline: true,
					},
				],
			},

			{
				type: "service.hours",
				label: "Hours & Contact",
				category: "Sections",
				description: "Opening hours with phone, email, and address",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{
						type: "repeater",
						action_id: "hours",
						label: "Hours",
						item_label: "Row",
						min_items: 1,
						max_items: 8,
						fields: [
							{ type: "text_input", action_id: "label", label: "Days", placeholder: "Mon – Fri" },
							{ type: "text_input", action_id: "value", label: "Hours", placeholder: "9am – 7pm" },
						],
					},
					{ type: "text_input", action_id: "phone", label: "Phone" },
					{ type: "text_input", action_id: "email", label: "Email" },
					{ type: "text_input", action_id: "address", label: "Address", multiline: true },
					{ type: "text_input", action_id: "note", label: "Note (e.g. walk-ins policy)", multiline: true },
				],
			},

			{
				type: "service.faq",
				label: "FAQ",
				category: "Sections",
				description: "Frequently asked questions",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{
						type: "repeater",
						action_id: "items",
						label: "Questions",
						item_label: "Question",
						min_items: 1,
						fields: [
							{ type: "text_input", action_id: "question", label: "Question" },
							{
								type: "text_input",
								action_id: "answer",
								label: "Answer",
								multiline: true,
							},
						],
					},
				],
			},

			{
				type: "service.cta",
				label: "Booking CTA",
				category: "Sections",
				description: "Full-width banner with a booking button",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{
						type: "text_input",
						action_id: "subheadline",
						label: "Subheadline",
						multiline: true,
					},
					{ type: "text_input", action_id: "ctaLabel", label: "Button label" },
					{ type: "text_input", action_id: "ctaUrl", label: "Button URL" },
				],
			},
		],
	},
};

export function createPlugin() {
	return definePlugin(definition);
}

export default createPlugin;
