declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		
	};

	type DataEntryMap = {
		"related": {
"21st-street-mission-1930s": {
	id: "21st-street-mission-1930s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"21st-street-mission-2020s": {
	id: "21st-street-mission-2020s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"602-club": {
	id: "602-club";
  collection: "related";
  data: InferEntrySchema<"related">
};
"aamaarazan": {
	id: "aamaarazan";
  collection: "related";
  data: InferEntrySchema<"related">
};
"aenar": {
	id: "aenar";
  collection: "related";
  data: InferEntrySchema<"related">
};
"airlock-utopia-planitia": {
	id: "airlock-utopia-planitia";
  collection: "related";
  data: InferEntrySchema<"related">
};
"akritirian": {
	id: "akritirian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"aldean": {
	id: "aldean";
  collection: "related";
  data: InferEntrySchema<"related">
};
"aldean-banner": {
	id: "aldean-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"aldebaran-whiskey": {
	id: "aldebaran-whiskey";
  collection: "related";
  data: InferEntrySchema<"related">
};
"alert-cloak-enabled": {
	id: "alert-cloak-enabled";
  collection: "related";
  data: InferEntrySchema<"related">
};
"alice-ship": {
	id: "alice-ship";
  collection: "related";
  data: InferEntrySchema<"related">
};
"alien-meditation-ascension-mandala": {
	id: "alien-meditation-ascension-mandala";
  collection: "related";
  data: InferEntrySchema<"related">
};
"alliance-for-global-unity": {
	id: "alliance-for-global-unity";
  collection: "related";
  data: InferEntrySchema<"related">
};
"alshain": {
	id: "alshain";
  collection: "related";
  data: InferEntrySchema<"related">
};
"altairian-grand-premier": {
	id: "altairian-grand-premier";
  collection: "related";
  data: InferEntrySchema<"related">
};
"alvanian-brandy": {
	id: "alvanian-brandy";
  collection: "related";
  data: InferEntrySchema<"related">
};
"amerind": {
	id: "amerind";
  collection: "related";
  data: InferEntrySchema<"related">
};
"anbo-jyutsu": {
	id: "anbo-jyutsu";
  collection: "related";
  data: InferEntrySchema<"related">
};
"andorian": {
	id: "andorian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"andorian-2380s": {
	id: "andorian-2380s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"andorian-3100s": {
	id: "andorian-3100s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"andorian-ale": {
	id: "andorian-ale";
  collection: "related";
  data: InferEntrySchema<"related">
};
"andorian-ale-b": {
	id: "andorian-ale-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"angel-1": {
	id: "angel-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"angosian": {
	id: "angosian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"angosian-super-soldier": {
	id: "angosian-super-soldier";
  collection: "related";
  data: InferEntrySchema<"related">
};
"antarian": {
	id: "antarian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"antwerp-conference-flag-a": {
	id: "antwerp-conference-flag-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"apergosian-museum-of-popular-music-banner-a": {
	id: "apergosian-museum-of-popular-music-banner-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"apergosian-museum-of-popular-music-banner-b": {
	id: "apergosian-museum-of-popular-music-banner-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"aquan": {
	id: "aquan";
  collection: "related";
  data: InferEntrySchema<"related">
};
"aquan-b": {
	id: "aquan-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"aquan-caduceus": {
	id: "aquan-caduceus";
  collection: "related";
  data: InferEntrySchema<"related">
};
"arcanis-lager": {
	id: "arcanis-lager";
  collection: "related";
  data: InferEntrySchema<"related">
};
"arctic-archaeology-team-3": {
	id: "arctic-archaeology-team-3";
  collection: "related";
  data: InferEntrySchema<"related">
};
"arctic-one": {
	id: "arctic-one";
  collection: "related";
  data: InferEntrySchema<"related">
};
"arctus-baran": {
	id: "arctus-baran";
  collection: "related";
  data: InferEntrySchema<"related">
};
"arctus-baran-ship-door-sign": {
	id: "arctus-baran-ship-door-sign";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ares-iv": {
	id: "ares-iv";
  collection: "related";
  data: InferEntrySchema<"related">
};
"argo-shuttle-ground-transport": {
	id: "argo-shuttle-ground-transport";
  collection: "related";
  data: InferEntrySchema<"related">
};
"arkonian": {
	id: "arkonian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"authorized-personnel-only-utopia-planitia": {
	id: "authorized-personnel-only-utopia-planitia";
  collection: "related";
  data: InferEntrySchema<"related">
};
"axanar": {
	id: "axanar";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bajor-admission-flag-a": {
	id: "bajor-admission-flag-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bajor-admission-flag-b": {
	id: "bajor-admission-flag-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bajoran": {
	id: "bajoran";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bajoran-flag-2400s": {
	id: "bajoran-flag-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bajoran-gratitude-festival": {
	id: "bajoran-gratitude-festival";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bajoran-market-banner-b": {
	id: "bajoran-market-banner-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bajoran-market-banner-c": {
	id: "bajoran-market-banner-c";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bajoran-market-banner-d": {
	id: "bajoran-market-banner-d";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bajoran-market-banner-e": {
	id: "bajoran-market-banner-e";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bajoran-marketplace-banner-a": {
	id: "bajoran-marketplace-banner-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bajoran-militia": {
	id: "bajoran-militia";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bajoran-militia-banner": {
	id: "bajoran-militia-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bajoran-pah-wraith": {
	id: "bajoran-pah-wraith";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bajoran-promenade-banner": {
	id: "bajoran-promenade-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bajoran-temple": {
	id: "bajoran-temple";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bandi": {
	id: "bandi";
  collection: "related";
  data: InferEntrySchema<"related">
};
"banean": {
	id: "banean";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bank-of-bolias": {
	id: "bank-of-bolias";
  collection: "related";
  data: InferEntrySchema<"related">
};
"barkonian": {
	id: "barkonian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"barkonian-banner-a": {
	id: "barkonian-banner-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"barkonian-banner-b": {
	id: "barkonian-banner-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"barkonian-banner-c": {
	id: "barkonian-banner-c";
  collection: "related";
  data: InferEntrySchema<"related">
};
"barkonian-banner-d": {
	id: "barkonian-banner-d";
  collection: "related";
  data: InferEntrySchema<"related">
};
"barkonian-shield": {
	id: "barkonian-shield";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bat-leths-and-bihnuchs": {
	id: "bat-leths-and-bihnuchs";
  collection: "related";
  data: InferEntrySchema<"related">
};
"batleths-r-us": {
	id: "batleths-r-us";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bay-stadium": {
	id: "bay-stadium";
  collection: "related";
  data: InferEntrySchema<"related">
};
"betazoid": {
	id: "betazoid";
  collection: "related";
  data: InferEntrySchema<"related">
};
"betazoid-flag": {
	id: "betazoid-flag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"biohazard-2370s": {
	id: "biohazard-2370s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"biotoxin": {
	id: "biotoxin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"black-alert": {
	id: "black-alert";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bolian-wine": {
	id: "bolian-wine";
  collection: "related";
  data: InferEntrySchema<"related">
};
"borg-b": {
	id: "borg-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"borg-banner-a": {
	id: "borg-banner-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"borg-banner-b": {
	id: "borg-banner-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"borg-collective": {
	id: "borg-collective";
  collection: "related";
  data: InferEntrySchema<"related">
};
"borg-queen-chamber": {
	id: "borg-queen-chamber";
  collection: "related";
  data: InferEntrySchema<"related">
};
"borg-slayer": {
	id: "borg-slayer";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bourbon-street-barn": {
	id: "bourbon-street-barn";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bozeman-banner-a": {
	id: "bozeman-banner-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bozeman-banner-b": {
	id: "bozeman-banner-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bozeman-banner-c": {
	id: "bozeman-banner-c";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bre-el-iv": {
	id: "bre-el-iv";
  collection: "related";
  data: InferEntrySchema<"related">
};
"breen": {
	id: "breen";
  collection: "related";
  data: InferEntrySchema<"related">
};
"breen-2370s": {
	id: "breen-2370s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"burgerland": {
	id: "burgerland";
  collection: "related";
  data: InferEntrySchema<"related">
};
"bynar": {
	id: "bynar";
  collection: "related";
  data: InferEntrySchema<"related">
};
"capellan-banner-a": {
	id: "capellan-banner-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"capellan-banner-b-capella-iv": {
	id: "capellan-banner-b-capella-iv";
  collection: "related";
  data: InferEntrySchema<"related">
};
"capellan-banner-c-capella-iv": {
	id: "capellan-banner-c-capella-iv";
  collection: "related";
  data: InferEntrySchema<"related">
};
"capellan-banner-d-capella-iv": {
	id: "capellan-banner-d-capella-iv";
  collection: "related";
  data: InferEntrySchema<"related">
};
"capellan-banner-e-capella-iv": {
	id: "capellan-banner-e-capella-iv";
  collection: "related";
  data: InferEntrySchema<"related">
};
"capellan-capella-iv": {
	id: "capellan-capella-iv";
  collection: "related";
  data: InferEntrySchema<"related">
};
"captain-proton": {
	id: "captain-proton";
  collection: "related";
  data: InferEntrySchema<"related">
};
"cardassia-3100s": {
	id: "cardassia-3100s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"cardassian": {
	id: "cardassian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"cardassian-insignia": {
	id: "cardassian-insignia";
  collection: "related";
  data: InferEntrySchema<"related">
};
"cardassian-judicial-banner": {
	id: "cardassian-judicial-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"cardassian-judiciary": {
	id: "cardassian-judiciary";
  collection: "related";
  data: InferEntrySchema<"related">
};
"cardassian-kanar-label": {
	id: "cardassian-kanar-label";
  collection: "related";
  data: InferEntrySchema<"related">
};
"cardassian-obsidian-order": {
	id: "cardassian-obsidian-order";
  collection: "related";
  data: InferEntrySchema<"related">
};
"cardassian-third-battalion-first-order": {
	id: "cardassian-third-battalion-first-order";
  collection: "related";
  data: InferEntrySchema<"related">
};
"cardassian-warship": {
	id: "cardassian-warship";
  collection: "related";
  data: InferEntrySchema<"related">
};
"cetacean-ops": {
	id: "cetacean-ops";
  collection: "related";
  data: InferEntrySchema<"related">
};
"chah-mooz-ee": {
	id: "chah-mooz-ee";
  collection: "related";
  data: InferEntrySchema<"related">
};
"charnock-s-comedy-cabaret": {
	id: "charnock-s-comedy-cabaret";
  collection: "related";
  data: InferEntrySchema<"related">
};
"charybdis": {
	id: "charybdis";
  collection: "related";
  data: InferEntrySchema<"related">
};
"chateau-picard-2260s": {
	id: "chateau-picard-2260s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"chateau-picard-label-2380s": {
	id: "chateau-picard-label-2380s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"chez-sandrine": {
	id: "chez-sandrine";
  collection: "related";
  data: InferEntrySchema<"related">
};
"chief-engineer-delta-2250s": {
	id: "chief-engineer-delta-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"children-of-the-son-892-iv": {
	id: "children-of-the-son-892-iv";
  collection: "related";
  data: InferEntrySchema<"related">
};
"chronowerx-industries": {
	id: "chronowerx-industries";
  collection: "related";
  data: InferEntrySchema<"related">
};
"chu-chu-dance": {
	id: "chu-chu-dance";
  collection: "related";
  data: InferEntrySchema<"related">
};
"circuitry-cartridge": {
	id: "circuitry-cartridge";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ckaptir": {
	id: "ckaptir";
  collection: "related";
  data: InferEntrySchema<"related">
};
"club-martus": {
	id: "club-martus";
  collection: "related";
  data: InferEntrySchema<"related">
};
"cold-station-12": {
	id: "cold-station-12";
  collection: "related";
  data: InferEntrySchema<"related">
};
"collector-s-guild-2380s": {
	id: "collector-s-guild-2380s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"collectors-guild-2360s": {
	id: "collectors-guild-2360s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"confederation-corps": {
	id: "confederation-corps";
  collection: "related";
  data: InferEntrySchema<"related">
};
"confederation-corps-banner": {
	id: "confederation-corps-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"confederation-corps-bridge-officer-2280s": {
	id: "confederation-corps-bridge-officer-2280s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"confederation-corps-delta-general": {
	id: "confederation-corps-delta-general";
  collection: "related";
  data: InferEntrySchema<"related">
};
"confederation-corps-informal": {
	id: "confederation-corps-informal";
  collection: "related";
  data: InferEntrySchema<"related">
};
"confederation-corps-insignia-brigadier-general": {
	id: "confederation-corps-insignia-brigadier-general";
  collection: "related";
  data: InferEntrySchema<"related">
};
"confederation-corps-insignia-captain": {
	id: "confederation-corps-insignia-captain";
  collection: "related";
  data: InferEntrySchema<"related">
};
"confederation-corps-insignia-colonel": {
	id: "confederation-corps-insignia-colonel";
  collection: "related";
  data: InferEntrySchema<"related">
};
"confederation-corps-insignia-lieutenant": {
	id: "confederation-corps-insignia-lieutenant";
  collection: "related";
  data: InferEntrySchema<"related">
};
"confederation-corps-insignia-lt.-colonel": {
	id: "confederation-corps-insignia-lt.-colonel";
  collection: "related";
  data: InferEntrySchema<"related">
};
"confederation-corps-insignia-major": {
	id: "confederation-corps-insignia-major";
  collection: "related";
  data: InferEntrySchema<"related">
};
"confederation-corps-synth": {
	id: "confederation-corps-synth";
  collection: "related";
  data: InferEntrySchema<"related">
};
"confederation-of-earth": {
	id: "confederation-of-earth";
  collection: "related";
  data: InferEntrySchema<"related">
};
"confederation-of-earth-banner-a": {
	id: "confederation-of-earth-banner-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"confederation-of-earth-banner-b": {
	id: "confederation-of-earth-banner-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"confederation-of-earth-cargo-label": {
	id: "confederation-of-earth-cargo-label";
  collection: "related";
  data: InferEntrySchema<"related">
};
"confederation-of-earth-informal": {
	id: "confederation-of-earth-informal";
  collection: "related";
  data: InferEntrySchema<"related">
};
"confederation-of-earth-insignia": {
	id: "confederation-of-earth-insignia";
  collection: "related";
  data: InferEntrySchema<"related">
};
"confederation-of-earth-synth": {
	id: "confederation-of-earth-synth";
  collection: "related";
  data: InferEntrySchema<"related">
};
"cosimo-s": {
	id: "cosimo-s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"crass-anti-war": {
	id: "crass-anti-war";
  collection: "related";
  data: InferEntrySchema<"related">
};
"cryotherm-systems": {
	id: "cryotherm-systems";
  collection: "related";
  data: InferEntrySchema<"related">
};
"cryotherm-systems-2250s": {
	id: "cryotherm-systems-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"curiously-delightful-root-beer": {
	id: "curiously-delightful-root-beer";
  collection: "related";
  data: InferEntrySchema<"related">
};
"darwin-genetic-research-station": {
	id: "darwin-genetic-research-station";
  collection: "related";
  data: InferEntrySchema<"related">
};
"daystrom-institute": {
	id: "daystrom-institute";
  collection: "related";
  data: InferEntrySchema<"related">
};
"deacon-s-bar": {
	id: "deacon-s-bar";
  collection: "related";
  data: InferEntrySchema<"related">
};
"deakohn": {
	id: "deakohn";
  collection: "related";
  data: InferEntrySchema<"related">
};
"dekendi-iii": {
	id: "dekendi-iii";
  collection: "related";
  data: InferEntrySchema<"related">
};
"dekendi-iii-banner-a": {
	id: "dekendi-iii-banner-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"dekendi-iii-banner-b": {
	id: "dekendi-iii-banner-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"delta-flyer": {
	id: "delta-flyer";
  collection: "related";
  data: InferEntrySchema<"related">
};
"denaxi-depot-cargo-label": {
	id: "denaxi-depot-cargo-label";
  collection: "related";
  data: InferEntrySchema<"related">
};
"denobulan": {
	id: "denobulan";
  collection: "related";
  data: InferEntrySchema<"related">
};
"denobulan-flag": {
	id: "denobulan-flag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"department-of-the-space-force": {
	id: "department-of-the-space-force";
  collection: "related";
  data: InferEntrySchema<"related">
};
"devron-500-poster": {
	id: "devron-500-poster";
  collection: "related";
  data: InferEntrySchema<"related">
};
"docking-port": {
	id: "docking-port";
  collection: "related";
  data: InferEntrySchema<"related">
};
"docking-port-1": {
	id: "docking-port-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"docking-port-ds9": {
	id: "docking-port-ds9";
  collection: "related";
  data: InferEntrySchema<"related">
};
"doctor-chaotica": {
	id: "doctor-chaotica";
  collection: "related";
  data: InferEntrySchema<"related">
};
"dominion-cargo-label": {
	id: "dominion-cargo-label";
  collection: "related";
  data: InferEntrySchema<"related">
};
"dominion-cargo-label-b": {
	id: "dominion-cargo-label-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"doopler": {
	id: "doopler";
  collection: "related";
  data: InferEntrySchema<"related">
};
"dosi": {
	id: "dosi";
  collection: "related";
  data: InferEntrySchema<"related">
};
"dot-23-insignia": {
	id: "dot-23-insignia";
  collection: "related";
  data: InferEntrySchema<"related">
};
"drayan": {
	id: "drayan";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ds9-advisory-sign-a": {
	id: "ds9-advisory-sign-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ds9-advisory-sign-b": {
	id: "ds9-advisory-sign-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ds9-advisory-sign-c": {
	id: "ds9-advisory-sign-c";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ds9-advisory-sign-d": {
	id: "ds9-advisory-sign-d";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ds9-advisory-sign-d-1": {
	id: "ds9-advisory-sign-d-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ds9-advisory-sign-f": {
	id: "ds9-advisory-sign-f";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ds9-airlock-a": {
	id: "ds9-airlock-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ds9-airlock-b": {
	id: "ds9-airlock-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ds9-niners": {
	id: "ds9-niners";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ds9-niners-1": {
	id: "ds9-niners-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ds9-office-of-the-assayer": {
	id: "ds9-office-of-the-assayer";
  collection: "related";
  data: InferEntrySchema<"related">
};
"dulainian": {
	id: "dulainian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"dytallix-mining-company": {
	id: "dytallix-mining-company";
  collection: "related";
  data: InferEntrySchema<"related">
};
"e-c-s-fortunate": {
	id: "e-c-s-fortunate";
  collection: "related";
  data: InferEntrySchema<"related">
};
"e-c-s-horizon": {
	id: "e-c-s-horizon";
  collection: "related";
  data: InferEntrySchema<"related">
};
"eanaran-banner": {
	id: "eanaran-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"earth-base": {
	id: "earth-base";
  collection: "related";
  data: InferEntrySchema<"related">
};
"earth-coalition-flag": {
	id: "earth-coalition-flag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"earth-coalition-force": {
	id: "earth-coalition-force";
  collection: "related";
  data: InferEntrySchema<"related">
};
"earth-judiciary": {
	id: "earth-judiciary";
  collection: "related";
  data: InferEntrySchema<"related">
};
"earth-saturn-probe": {
	id: "earth-saturn-probe";
  collection: "related";
  data: InferEntrySchema<"related">
};
"earth-sciences-institute": {
	id: "earth-sciences-institute";
  collection: "related";
  data: InferEntrySchema<"related">
};
"earthshine-aerospace": {
	id: "earthshine-aerospace";
  collection: "related";
  data: InferEntrySchema<"related">
};
"edo": {
	id: "edo";
  collection: "related";
  data: InferEntrySchema<"related">
};
"emerald-chain-seal": {
	id: "emerald-chain-seal";
  collection: "related";
  data: InferEntrySchema<"related">
};
"emergency-containment": {
	id: "emergency-containment";
  collection: "related";
  data: InferEntrySchema<"related">
};
"eminiar-vii": {
	id: "eminiar-vii";
  collection: "related";
  data: InferEntrySchema<"related">
};
"enaran": {
	id: "enaran";
  collection: "related";
  data: InferEntrySchema<"related">
};
"enaran-banner-b": {
	id: "enaran-banner-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ennis": {
	id: "ennis";
  collection: "related";
  data: InferEntrySchema<"related">
};
"enolian": {
	id: "enolian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"enolian-1": {
	id: "enolian-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"enterprise-conference-room-flag-a": {
	id: "enterprise-conference-room-flag-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"enterprise-conference-room-flag-b": {
	id: "enterprise-conference-room-flag-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"enterprise-seal-2250s-c": {
	id: "enterprise-seal-2250s-c";
  collection: "related";
  data: InferEntrySchema<"related">
};
"epsilon-ix-station": {
	id: "epsilon-ix-station";
  collection: "related";
  data: InferEntrySchema<"related">
};
"europa-mission": {
	id: "europa-mission";
  collection: "related";
  data: InferEntrySchema<"related">
};
"europa-mission-flag": {
	id: "europa-mission-flag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"europa-mission-flag-b": {
	id: "europa-mission-flag-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"europa-mission-insignia": {
	id: "europa-mission-insignia";
  collection: "related";
  data: InferEntrySchema<"related">
};
"europa-mission-security": {
	id: "europa-mission-security";
  collection: "related";
  data: InferEntrySchema<"related">
};
"facian": {
	id: "facian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"falcon": {
	id: "falcon";
  collection: "related";
  data: InferEntrySchema<"related">
};
"farius-prime": {
	id: "farius-prime";
  collection: "related";
  data: InferEntrySchema<"related">
};
"fdbnet": {
	id: "fdbnet";
  collection: "related";
  data: InferEntrySchema<"related">
};
"federal-bancorp-of-detroit-fbd-atm": {
	id: "federal-bancorp-of-detroit-fbd-atm";
  collection: "related";
  data: InferEntrySchema<"related">
};
"federation-diplomatic-flag": {
	id: "federation-diplomatic-flag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"federation-news-network-fnn": {
	id: "federation-news-network-fnn";
  collection: "related";
  data: InferEntrySchema<"related">
};
"federation-news-network-fnn-2380s": {
	id: "federation-news-network-fnn-2380s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"federation-news-network-fnn-a": {
	id: "federation-news-network-fnn-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"feeley-s-venom-garden": {
	id: "feeley-s-venom-garden";
  collection: "related";
  data: InferEntrySchema<"related">
};
"fenris-rangers": {
	id: "fenris-rangers";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ferengi": {
	id: "ferengi";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ferengi-alliance-3100s": {
	id: "ferengi-alliance-3100s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ferengi-banner": {
	id: "ferengi-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ferengi-banner-b": {
	id: "ferengi-banner-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ferengi-commerce-authority": {
	id: "ferengi-commerce-authority";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ferengi-flag-2400s": {
	id: "ferengi-flag-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ferengi-foreclosure-notice": {
	id: "ferengi-foreclosure-notice";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ferengi-seal-of-dismemberment": {
	id: "ferengi-seal-of-dismemberment";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ferengi-wine": {
	id: "ferengi-wine";
  collection: "related";
  data: InferEntrySchema<"related">
};
"fire-extinguisher": {
	id: "fire-extinguisher";
  collection: "related";
  data: InferEntrySchema<"related">
};
"first-contact-fun-zone": {
	id: "first-contact-fun-zone";
  collection: "related";
  data: InferEntrySchema<"related">
};
"fish-restaurant": {
	id: "fish-restaurant";
  collection: "related";
  data: InferEntrySchema<"related">
};
"fish-restaurant-1": {
	id: "fish-restaurant-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"fnn-press-badge-2380s": {
	id: "fnn-press-badge-2380s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"fpc-news": {
	id: "fpc-news";
  collection: "related";
  data: InferEntrySchema<"related">
};
"fractal-neuronic-cloning": {
	id: "fractal-neuronic-cloning";
  collection: "related";
  data: InferEntrySchema<"related">
};
"free-spirit": {
	id: "free-spirit";
  collection: "related";
  data: InferEntrySchema<"related">
};
"freecloud": {
	id: "freecloud";
  collection: "related";
  data: InferEntrySchema<"related">
};
"freecloud-grand-hotel": {
	id: "freecloud-grand-hotel";
  collection: "related";
  data: InferEntrySchema<"related">
};
"freecloud-institute-for-entertainment-robotics": {
	id: "freecloud-institute-for-entertainment-robotics";
  collection: "related";
  data: InferEntrySchema<"related">
};
"friendship-1": {
	id: "friendship-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"fusion-jazz-club": {
	id: "fusion-jazz-club";
  collection: "related";
  data: InferEntrySchema<"related">
};
"galaxy-class-starship-development": {
	id: "galaxy-class-starship-development";
  collection: "related";
  data: InferEntrySchema<"related">
};
"garan": {
	id: "garan";
  collection: "related";
  data: InferEntrySchema<"related">
};
"gelrakian": {
	id: "gelrakian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"gelrakian-banner": {
	id: "gelrakian-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"gelrakian-stadium": {
	id: "gelrakian-stadium";
  collection: "related";
  data: InferEntrySchema<"related">
};
"genesis-device": {
	id: "genesis-device";
  collection: "related";
  data: InferEntrySchema<"related">
};
"gnn-news-service": {
	id: "gnn-news-service";
  collection: "related";
  data: InferEntrySchema<"related">
};
"gorn-hegemony": {
	id: "gorn-hegemony";
  collection: "related";
  data: InferEntrySchema<"related">
};
"gosis-species-military-badge": {
	id: "gosis-species-military-badge";
  collection: "related";
  data: InferEntrySchema<"related">
};
"halkan": {
	id: "halkan";
  collection: "related";
  data: InferEntrySchema<"related">
};
"harvester": {
	id: "harvester";
  collection: "related";
  data: InferEntrySchema<"related">
};
"heisler-beer": {
	id: "heisler-beer";
  collection: "related";
  data: InferEntrySchema<"related">
};
"hierarchy": {
	id: "hierarchy";
  collection: "related";
  data: InferEntrySchema<"related">
};
"high-voltage-utopia-planitia": {
	id: "high-voltage-utopia-planitia";
  collection: "related";
  data: InferEntrySchema<"related">
};
"hirogen": {
	id: "hirogen";
  collection: "related";
  data: InferEntrySchema<"related">
};
"historical-bozeman": {
	id: "historical-bozeman";
  collection: "related";
  data: InferEntrySchema<"related">
};
"holosuites": {
	id: "holosuites";
  collection: "related";
  data: InferEntrySchema<"related">
};
"homeworld-native": {
	id: "homeworld-native";
  collection: "related";
  data: InferEntrySchema<"related">
};
"hornish": {
	id: "hornish";
  collection: "related";
  data: InferEntrySchema<"related">
};
"house-of-martok-banner": {
	id: "house-of-martok-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"hur-q": {
	id: "hur-q";
  collection: "related";
  data: InferEntrySchema<"related">
};
"hysperian": {
	id: "hysperian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"i-d-i-c": {
	id: "i-d-i-c";
  collection: "related";
  data: InferEntrySchema<"related">
};
"iconian": {
	id: "iconian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ilari-autarch": {
	id: "ilari-autarch";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ilari-banner": {
	id: "ilari-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"imhotep": {
	id: "imhotep";
  collection: "related";
  data: InferEntrySchema<"related">
};
"independent-archaeologists-guild": {
	id: "independent-archaeologists-guild";
  collection: "related";
  data: InferEntrySchema<"related">
};
"interface-data-link": {
	id: "interface-data-link";
  collection: "related";
  data: InferEntrySchema<"related">
};
"international-space-agency": {
	id: "international-space-agency";
  collection: "related";
  data: InferEntrySchema<"related">
};
"iyaaran": {
	id: "iyaaran";
  collection: "related";
  data: InferEntrySchema<"related">
};
"j-naii": {
	id: "j-naii";
  collection: "related";
  data: InferEntrySchema<"related">
};
"jantaq-clocks": {
	id: "jantaq-clocks";
  collection: "related";
  data: InferEntrySchema<"related">
};
"jin-gong": {
	id: "jin-gong";
  collection: "related";
  data: InferEntrySchema<"related">
};
"johnnies-market": {
	id: "johnnies-market";
  collection: "related";
  data: InferEntrySchema<"related">
};
"jupiter-station": {
	id: "jupiter-station";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kadi": {
	id: "kadi";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kago-darr": {
	id: "kago-darr";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kahless-the-unforgettable": {
	id: "kahless-the-unforgettable";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kantare": {
	id: "kantare";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kasidy-yates-interstellar-freights": {
	id: "kasidy-yates-interstellar-freights";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kazon": {
	id: "kazon";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kazon-order-a": {
	id: "kazon-order-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kazon-order-b": {
	id: "kazon-order-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kelemane-s-planet": {
	id: "kelemane-s-planet";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kes": {
	id: "kes";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kesprytt-prison": {
	id: "kesprytt-prison";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ketracel-white-hot": {
	id: "ketracel-white-hot";
  collection: "related";
  data: InferEntrySchema<"related">
};
"khitomer-conference": {
	id: "khitomer-conference";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kiley": {
	id: "kiley";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kiley-flag-a": {
	id: "kiley-flag-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kiley-flag-b": {
	id: "kiley-flag-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kiley-flag-c": {
	id: "kiley-flag-c";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kiley-seal": {
	id: "kiley-seal";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kiley-security-patch": {
	id: "kiley-security-patch";
  collection: "related";
  data: InferEntrySchema<"related">
};
"king-mei": {
	id: "king-mei";
  collection: "related";
  data: InferEntrySchema<"related">
};
"king-ridley": {
	id: "king-ridley";
  collection: "related";
  data: InferEntrySchema<"related">
};
"king-ridley-banner": {
	id: "king-ridley-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"king-ridley-s-chamberlain": {
	id: "king-ridley-s-chamberlain";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-advisory-sample": {
	id: "klingon-advisory-sample";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-banner": {
	id: "klingon-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-banner-2150s": {
	id: "klingon-banner-2150s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-banner-2370s": {
	id: "klingon-banner-2370s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-banner-2380s": {
	id: "klingon-banner-2380s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-banner-insignia": {
	id: "klingon-banner-insignia";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-bloodwine": {
	id: "klingon-bloodwine";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-bloodwine-2380s": {
	id: "klingon-bloodwine-2380s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-cardassian-alliance": {
	id: "klingon-cardassian-alliance";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-cardassian-alliance-banner": {
	id: "klingon-cardassian-alliance-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-cardassian-alliance-crew": {
	id: "klingon-cardassian-alliance-crew";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-cargo": {
	id: "klingon-cargo";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-cargo-label": {
	id: "klingon-cargo-label";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-chancellor-of-the-high-council": {
	id: "klingon-chancellor-of-the-high-council";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-communicator-insignia-2360s": {
	id: "klingon-communicator-insignia-2360s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-communicator-insignia-2370s": {
	id: "klingon-communicator-insignia-2370s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-court": {
	id: "klingon-court";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-court-banner-2150s": {
	id: "klingon-court-banner-2150s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-court-banner-2290s": {
	id: "klingon-court-banner-2290s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-defense-force-2260s": {
	id: "klingon-defense-force-2260s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-diplomatic-flag": {
	id: "klingon-diplomatic-flag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-empire": {
	id: "klingon-empire";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-empire-2150s-b": {
	id: "klingon-empire-2150s-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-empire-2150s-c": {
	id: "klingon-empire-2150s-c";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-empire-2260s": {
	id: "klingon-empire-2260s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-empire-2280s": {
	id: "klingon-empire-2280s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-empire-2280s-1": {
	id: "klingon-empire-2280s-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-empire-2400s": {
	id: "klingon-empire-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-empire-flag-2400s": {
	id: "klingon-empire-flag-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-high-council": {
	id: "klingon-high-council";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-high-council-banner": {
	id: "klingon-high-council-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-house-of-d-ghor": {
	id: "klingon-house-of-d-ghor";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-house-of-duras": {
	id: "klingon-house-of-duras";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-house-of-gorkon": {
	id: "klingon-house-of-gorkon";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-house-of-gowron": {
	id: "klingon-house-of-gowron";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-house-of-grilka": {
	id: "klingon-house-of-grilka";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-house-of-k-mpec": {
	id: "klingon-house-of-k-mpec";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-house-of-kaybok": {
	id: "klingon-house-of-kaybok";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-house-of-koloth": {
	id: "klingon-house-of-koloth";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-house-of-martok": {
	id: "klingon-house-of-martok";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-house-of-martok-shield": {
	id: "klingon-house-of-martok-shield";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-house-of-mogh": {
	id: "klingon-house-of-mogh";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-house-of-molor": {
	id: "klingon-house-of-molor";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-kot-baval-banner-b": {
	id: "klingon-kot-baval-banner-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-kot-baval-banner-c": {
	id: "klingon-kot-baval-banner-c";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-kot-baval-banner-d": {
	id: "klingon-kot-baval-banner-d";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-kot-baval-banner-d-1": {
	id: "klingon-kot-baval-banner-d-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-medal-of-honor": {
	id: "klingon-medal-of-honor";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-mok-bara-banner": {
	id: "klingon-mok-bara-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-order-of-the-bat-leth": {
	id: "klingon-order-of-the-bat-leth";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-promenade-banner": {
	id: "klingon-promenade-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-restaurant-ds9-promenade": {
	id: "klingon-restaurant-ds9-promenade";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-shield": {
	id: "klingon-shield";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-star-of-kahless": {
	id: "klingon-star-of-kahless";
  collection: "related";
  data: InferEntrySchema<"related">
};
"klingon-welcome-banner": {
	id: "klingon-welcome-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kobliad": {
	id: "kobliad";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kohl": {
	id: "kohl";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kohl-circus": {
	id: "kohl-circus";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kohl-circus-banner-a": {
	id: "kohl-circus-banner-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kohl-circus-banner-b": {
	id: "kohl-circus-banner-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"korob-pyris-vii": {
	id: "korob-pyris-vii";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kraylor": {
	id: "kraylor";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kreetassan": {
	id: "kreetassan";
  collection: "related";
  data: InferEntrySchema<"related">
};
"krenim-imperium": {
	id: "krenim-imperium";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kwejian": {
	id: "kwejian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kynk-s-mugato-land-banner-a": {
	id: "kynk-s-mugato-land-banner-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kynk-s-mugato-land-banner-b": {
	id: "kynk-s-mugato-land-banner-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kynk-s-mugato-land-banner-c": {
	id: "kynk-s-mugato-land-banner-c";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kynk-s-mugato-land-frylon-iv": {
	id: "kynk-s-mugato-land-frylon-iv";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kyrian-museum-of-heritage": {
	id: "kyrian-museum-of-heritage";
  collection: "related";
  data: InferEntrySchema<"related">
};
"kzinti": {
	id: "kzinti";
  collection: "related";
  data: InferEntrySchema<"related">
};
"l5-test-station": {
	id: "l5-test-station";
  collection: "related";
  data: InferEntrySchema<"related">
};
"la-sirena": {
	id: "la-sirena";
  collection: "related";
  data: InferEntrySchema<"related">
};
"laikan-military-academy": {
	id: "laikan-military-academy";
  collection: "related";
  data: InferEntrySchema<"related">
};
"las-mariposas-2020s": {
	id: "las-mariposas-2020s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"las-mariposas-2400s": {
	id: "las-mariposas-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"latrelle-deployment-patch": {
	id: "latrelle-deployment-patch";
  collection: "related";
  data: InferEntrySchema<"related">
};
"lazarus": {
	id: "lazarus";
  collection: "related";
  data: InferEntrySchema<"related">
};
"lieutenant-ilia": {
	id: "lieutenant-ilia";
  collection: "related";
  data: InferEntrySchema<"related">
};
"life-support-systems": {
	id: "life-support-systems";
  collection: "related";
  data: InferEntrySchema<"related">
};
"light-cube-tables": {
	id: "light-cube-tables";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ligonian": {
	id: "ligonian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"live-vaccines-medical-cargo-label": {
	id: "live-vaccines-medical-cargo-label";
  collection: "related";
  data: InferEntrySchema<"related">
};
"london-kings": {
	id: "london-kings";
  collection: "related";
  data: InferEntrySchema<"related">
};
"lurian": {
	id: "lurian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"m-113": {
	id: "m-113";
  collection: "related";
  data: InferEntrySchema<"related">
};
"m-a-c-o-enterprise-deployment": {
	id: "m-a-c-o-enterprise-deployment";
  collection: "related";
  data: InferEntrySchema<"related">
};
"m-a-c-o-enterprise-deployment-1": {
	id: "m-a-c-o-enterprise-deployment-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"makull-s-homeworld": {
	id: "makull-s-homeworld";
  collection: "related";
  data: InferEntrySchema<"related">
};
"makull-s-homeworld-security": {
	id: "makull-s-homeworld-security";
  collection: "related";
  data: InferEntrySchema<"related">
};
"malcorian-space-bureau": {
	id: "malcorian-space-bureau";
  collection: "related";
  data: InferEntrySchema<"related">
};
"malon": {
	id: "malon";
  collection: "related";
  data: InferEntrySchema<"related">
};
"malurian": {
	id: "malurian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"manifold-utopia-planitia": {
	id: "manifold-utopia-planitia";
  collection: "related";
  data: InferEntrySchema<"related">
};
"maquis": {
	id: "maquis";
  collection: "related";
  data: InferEntrySchema<"related">
};
"maquis-colony-bar-ronara-prime": {
	id: "maquis-colony-bar-ronara-prime";
  collection: "related";
  data: InferEntrySchema<"related">
};
"maquis-colony-ronara-prime": {
	id: "maquis-colony-ronara-prime";
  collection: "related";
  data: InferEntrySchema<"related">
};
"mari-security": {
	id: "mari-security";
  collection: "related";
  data: InferEntrySchema<"related">
};
"mari-security-assignment-patch": {
	id: "mari-security-assignment-patch";
  collection: "related";
  data: InferEntrySchema<"related">
};
"mariposan": {
	id: "mariposan";
  collection: "related";
  data: InferEntrySchema<"related">
};
"mawasi": {
	id: "mawasi";
  collection: "related";
  data: InferEntrySchema<"related">
};
"mazarite": {
	id: "mazarite";
  collection: "related";
  data: InferEntrySchema<"related">
};
"megalomaniacal-computer-i": {
	id: "megalomaniacal-computer-i";
  collection: "related";
  data: InferEntrySchema<"related">
};
"mikulak": {
	id: "mikulak";
  collection: "related";
  data: InferEntrySchema<"related">
};
"mikulak-cargo-label": {
	id: "mikulak-cargo-label";
  collection: "related";
  data: InferEntrySchema<"related">
};
"military-assault-command-operations-maco": {
	id: "military-assault-command-operations-maco";
  collection: "related";
  data: InferEntrySchema<"related">
};
"mokra-order": {
	id: "mokra-order";
  collection: "related";
  data: InferEntrySchema<"related">
};
"mokra-order-sign-a": {
	id: "mokra-order-sign-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"mokra-order-sign-b": {
	id: "mokra-order-sign-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"montana-lions": {
	id: "montana-lions";
  collection: "related";
  data: InferEntrySchema<"related">
};
"mordan-iv": {
	id: "mordan-iv";
  collection: "related";
  data: InferEntrySchema<"related">
};
"mordanite-banner-mordan-iv": {
	id: "mordanite-banner-mordan-iv";
  collection: "related";
  data: InferEntrySchema<"related">
};
"mordanite-military-insignia-mordan-iv": {
	id: "mordanite-military-insignia-mordan-iv";
  collection: "related";
  data: InferEntrySchema<"related">
};
"mr.krada-leg": {
	id: "mr.krada-leg";
  collection: "related";
  data: InferEntrySchema<"related">
};
"mr.mot-s-hair-emporium": {
	id: "mr.mot-s-hair-emporium";
  collection: "related";
  data: InferEntrySchema<"related">
};
"multi-mitt-jankom-pog": {
	id: "multi-mitt-jankom-pog";
  collection: "related";
  data: InferEntrySchema<"related">
};
"nasa-flag": {
	id: "nasa-flag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1017-constellation-crew": {
	id: "ncc-1017-constellation-crew";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1031-discovery": {
	id: "ncc-1031-discovery";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1031-discovery-1": {
	id: "ncc-1031-discovery-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1621-mayflower": {
	id: "ncc-1621-mayflower";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1672-exeter-crew-command": {
	id: "ncc-1672-exeter-crew-command";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1672-exeter-crew-command-1": {
	id: "ncc-1672-exeter-crew-command-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1701-a-seal": {
	id: "ncc-1701-a-seal";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1701-enterprise": {
	id: "ncc-1701-enterprise";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1701-enterprise-crew-command": {
	id: "ncc-1701-enterprise-crew-command";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1701-enterprise-crew-command-1": {
	id: "ncc-1701-enterprise-crew-command-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1701-enterprise-crew-command-2": {
	id: "ncc-1701-enterprise-crew-command-2";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1701-enterprise-crew-command-2250s-a": {
	id: "ncc-1701-enterprise-crew-command-2250s-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1701-enterprise-crew-command-2250s-b": {
	id: "ncc-1701-enterprise-crew-command-2250s-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1701-enterprise-crew-command-3": {
	id: "ncc-1701-enterprise-crew-command-3";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1701-enterprise-crew-engineering-2260s-b": {
	id: "ncc-1701-enterprise-crew-engineering-2260s-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1701-enterprise-crew-operations-2250s-a": {
	id: "ncc-1701-enterprise-crew-operations-2250s-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1701-enterprise-crew-sciences": {
	id: "ncc-1701-enterprise-crew-sciences";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1701-enterprise-crew-sciences-1": {
	id: "ncc-1701-enterprise-crew-sciences-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1701-enterprise-crew-sciences-2": {
	id: "ncc-1701-enterprise-crew-sciences-2";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1701-enterprise-crew-sciences-2250s-b": {
	id: "ncc-1701-enterprise-crew-sciences-2250s-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1702-enterprise-crew-command-2260s-b": {
	id: "ncc-1702-enterprise-crew-command-2260s-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1702-enterprise-crew-sciences-2260s-b": {
	id: "ncc-1702-enterprise-crew-sciences-2260s-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1764-defiant-command": {
	id: "ncc-1764-defiant-command";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1764-defiant-crew-command": {
	id: "ncc-1764-defiant-crew-command";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-1764-defiant-crew-sciences": {
	id: "ncc-1764-defiant-crew-sciences";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-501-antares": {
	id: "ncc-501-antares";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-80102-uss-titan-crew": {
	id: "ncc-80102-uss-titan-crew";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ncc-f1913-huron-crew": {
	id: "ncc-f1913-huron-crew";
  collection: "related";
  data: InferEntrySchema<"related">
};
"new-eden-terralysium": {
	id: "new-eden-terralysium";
  collection: "related";
  data: InferEntrySchema<"related">
};
"new-sydney-police": {
	id: "new-sydney-police";
  collection: "related";
  data: InferEntrySchema<"related">
};
"news-90": {
	id: "news-90";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ni-var": {
	id: "ni-var";
  collection: "related";
  data: InferEntrySchema<"related">
};
"nichesti": {
	id: "nichesti";
  collection: "related";
  data: InferEntrySchema<"related">
};
"nol-ennis": {
	id: "nol-ennis";
  collection: "related";
  data: InferEntrySchema<"related">
};
"noonian-soong": {
	id: "noonian-soong";
  collection: "related";
  data: InferEntrySchema<"related">
};
"north-american-water-polo-regionals": {
	id: "north-american-water-polo-regionals";
  collection: "related";
  data: InferEntrySchema<"related">
};
"nx-01-enterprise": {
	id: "nx-01-enterprise";
  collection: "related";
  data: InferEntrySchema<"related">
};
"nx-01-enterprise-1": {
	id: "nx-01-enterprise-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"nx-02-columbia": {
	id: "nx-02-columbia";
  collection: "related";
  data: InferEntrySchema<"related">
};
"nx-09-avenger": {
	id: "nx-09-avenger";
  collection: "related";
  data: InferEntrySchema<"related">
};
"nx-326-franklin": {
	id: "nx-326-franklin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"nx-project": {
	id: "nx-project";
  collection: "related";
  data: InferEntrySchema<"related">
};
"nx-project-flight-director": {
	id: "nx-project-flight-director";
  collection: "related";
  data: InferEntrySchema<"related">
};
"nyrian": {
	id: "nyrian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ocampa": {
	id: "ocampa";
  collection: "related";
  data: InferEntrySchema<"related">
};
"omega-directive": {
	id: "omega-directive";
  collection: "related";
  data: InferEntrySchema<"related">
};
"orion-3100s": {
	id: "orion-3100s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"orion-outpost-qualor-ii": {
	id: "orion-outpost-qualor-ii";
  collection: "related";
  data: InferEntrySchema<"related">
};
"orion-syndicate": {
	id: "orion-syndicate";
  collection: "related";
  data: InferEntrySchema<"related">
};
"orion-syndicate-2260s": {
	id: "orion-syndicate-2260s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ornaran-10k-run": {
	id: "ornaran-10k-run";
  collection: "related";
  data: InferEntrySchema<"related">
};
"orpheus-mining": {
	id: "orpheus-mining";
  collection: "related";
  data: InferEntrySchema<"related">
};
"orpheus-mining-authority": {
	id: "orpheus-mining-authority";
  collection: "related";
  data: InferEntrySchema<"related">
};
"orpheus-mining-authority-1": {
	id: "orpheus-mining-authority-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"osaarian": {
	id: "osaarian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"osnullus": {
	id: "osnullus";
  collection: "related";
  data: InferEntrySchema<"related">
};
"padronian": {
	id: "padronian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"pakled": {
	id: "pakled";
  collection: "related";
  data: InferEntrySchema<"related">
};
"pakled-2380s-a": {
	id: "pakled-2380s-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"pakled-2380s-b": {
	id: "pakled-2380s-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"pakled-2380s-c": {
	id: "pakled-2380s-c";
  collection: "related";
  data: InferEntrySchema<"related">
};
"pakled-flag": {
	id: "pakled-flag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"paradise-city-nimbus-iii": {
	id: "paradise-city-nimbus-iii";
  collection: "related";
  data: InferEntrySchema<"related">
};
"pathfinder-project": {
	id: "pathfinder-project";
  collection: "related";
  data: InferEntrySchema<"related">
};
"peliar-zel-ii": {
	id: "peliar-zel-ii";
  collection: "related";
  data: InferEntrySchema<"related">
};
"pentarus-v": {
	id: "pentarus-v";
  collection: "related";
  data: InferEntrySchema<"related">
};
"personal-posessions-storage": {
	id: "personal-posessions-storage";
  collection: "related";
  data: InferEntrySchema<"related">
};
"phoenix-experience-ride": {
	id: "phoenix-experience-ride";
  collection: "related";
  data: InferEntrySchema<"related">
};
"phoenix-nose-art": {
	id: "phoenix-nose-art";
  collection: "related";
  data: InferEntrySchema<"related">
};
"phoenix-warp-ship": {
	id: "phoenix-warp-ship";
  collection: "related";
  data: InferEntrySchema<"related">
};
"photon-warhead-label": {
	id: "photon-warhead-label";
  collection: "related";
  data: InferEntrySchema<"related">
};
"phylosian-translator": {
	id: "phylosian-translator";
  collection: "related";
  data: InferEntrySchema<"related">
};
"pike-city-pioneers-cestus-iii": {
	id: "pike-city-pioneers-cestus-iii";
  collection: "related";
  data: InferEntrySchema<"related">
};
"pine-tree-bar-and-grill": {
	id: "pine-tree-bar-and-grill";
  collection: "related";
  data: InferEntrySchema<"related">
};
"plexicorp": {
	id: "plexicorp";
  collection: "related";
  data: InferEntrySchema<"related">
};
"portage-creek-police-department": {
	id: "portage-creek-police-department";
  collection: "related";
  data: InferEntrySchema<"related">
};
"portola-sardines": {
	id: "portola-sardines";
  collection: "related";
  data: InferEntrySchema<"related">
};
"power-off-warning-utopia-planitia": {
	id: "power-off-warning-utopia-planitia";
  collection: "related";
  data: InferEntrySchema<"related">
};
"pralor": {
	id: "pralor";
  collection: "related";
  data: InferEntrySchema<"related">
};
"preservers": {
	id: "preservers";
  collection: "related";
  data: InferEntrySchema<"related">
};
"president-of-earth": {
	id: "president-of-earth";
  collection: "related";
  data: InferEntrySchema<"related">
};
"prodigy-ship-directional-sample": {
	id: "prodigy-ship-directional-sample";
  collection: "related";
  data: InferEntrySchema<"related">
};
"promellian": {
	id: "promellian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"promenade-banner-a": {
	id: "promenade-banner-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"promenade-banner-b": {
	id: "promenade-banner-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"promenade-banner-c": {
	id: "promenade-banner-c";
  collection: "related";
  data: InferEntrySchema<"related">
};
"promenade-banner-d": {
	id: "promenade-banner-d";
  collection: "related";
  data: InferEntrySchema<"related">
};
"promenade-banner-e": {
	id: "promenade-banner-e";
  collection: "related";
  data: InferEntrySchema<"related">
};
"promenade-banner-f": {
	id: "promenade-banner-f";
  collection: "related";
  data: InferEntrySchema<"related">
};
"protostar-helm-control": {
	id: "protostar-helm-control";
  collection: "related";
  data: InferEntrySchema<"related">
};
"prytt-alliance": {
	id: "prytt-alliance";
  collection: "related";
  data: InferEntrySchema<"related">
};
"prytt-prison": {
	id: "prytt-prison";
  collection: "related";
  data: InferEntrySchema<"related">
};
"pyris-vii-shield-a": {
	id: "pyris-vii-shield-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"pyris-vii-shield-b": {
	id: "pyris-vii-shield-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"q-2020s": {
	id: "q-2020s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"q-2380s": {
	id: "q-2380s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"q-french-revolution": {
	id: "q-french-revolution";
  collection: "related";
  data: InferEntrySchema<"related">
};
"qomar": {
	id: "qomar";
  collection: "related";
  data: InferEntrySchema<"related">
};
"quantum-stasis-field": {
	id: "quantum-stasis-field";
  collection: "related";
  data: InferEntrySchema<"related">
};
"quark-2000": {
	id: "quark-2000";
  collection: "related";
  data: InferEntrySchema<"related">
};
"quark-authentic-starfleet-miniatures": {
	id: "quark-authentic-starfleet-miniatures";
  collection: "related";
  data: InferEntrySchema<"related">
};
"quark-bucks": {
	id: "quark-bucks";
  collection: "related";
  data: InferEntrySchema<"related">
};
"quark-deep-space-nine-miniature": {
	id: "quark-deep-space-nine-miniature";
  collection: "related";
  data: InferEntrySchema<"related">
};
"quark-s-bar-2390s": {
	id: "quark-s-bar-2390s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"quark-s-bar-a": {
	id: "quark-s-bar-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"quark-s-bar-b": {
	id: "quark-s-bar-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"quark-s-bar-grill-gaming-house-and-holosuite-arcade": {
	id: "quark-s-bar-grill-gaming-house-and-holosuite-arcade";
  collection: "related";
  data: InferEntrySchema<"related">
};
"quark-s-pennant": {
	id: "quark-s-pennant";
  collection: "related";
  data: InferEntrySchema<"related">
};
"quarren-poster": {
	id: "quarren-poster";
  collection: "related";
  data: InferEntrySchema<"related">
};
"quarren-security-insignia": {
	id: "quarren-security-insignia";
  collection: "related";
  data: InferEntrySchema<"related">
};
"quarren-security-patch": {
	id: "quarren-security-patch";
  collection: "related";
  data: InferEntrySchema<"related">
};
"queen-neve": {
	id: "queen-neve";
  collection: "related";
  data: InferEntrySchema<"related">
};
"queen-neve-banner": {
	id: "queen-neve-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"radiation-hazard-2260s-b-kelvin": {
	id: "radiation-hazard-2260s-b-kelvin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"radiation-hazard-2260s-kelvin": {
	id: "radiation-hazard-2260s-kelvin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"radiation-hazard-2360s-a": {
	id: "radiation-hazard-2360s-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"radiation-hazard-2360s-b": {
	id: "radiation-hazard-2360s-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"red-alert": {
	id: "red-alert";
  collection: "related";
  data: InferEntrySchema<"related">
};
"red-alert-2280s": {
	id: "red-alert-2280s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"red-alert-2400s": {
	id: "red-alert-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"relva-vii": {
	id: "relva-vii";
  collection: "related";
  data: InferEntrySchema<"related">
};
"reman": {
	id: "reman";
  collection: "related";
  data: InferEntrySchema<"related">
};
"reman-2380s": {
	id: "reman-2380s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"rememberance-day-pin-discovery": {
	id: "rememberance-day-pin-discovery";
  collection: "related";
  data: InferEntrySchema<"related">
};
"remembrance-day-pin-ss-puget-sound": {
	id: "remembrance-day-pin-ss-puget-sound";
  collection: "related";
  data: InferEntrySchema<"related">
};
"remembrance-day-pin-uss-angelou": {
	id: "remembrance-day-pin-uss-angelou";
  collection: "related";
  data: InferEntrySchema<"related">
};
"remembrance-day-pin-uss-antares": {
	id: "remembrance-day-pin-uss-antares";
  collection: "related";
  data: InferEntrySchema<"related">
};
"remembrance-day-pin-uss-cuyahoga": {
	id: "remembrance-day-pin-uss-cuyahoga";
  collection: "related";
  data: InferEntrySchema<"related">
};
"remembrance-day-pin-uss-excalibur": {
	id: "remembrance-day-pin-uss-excalibur";
  collection: "related";
  data: InferEntrySchema<"related">
};
"remembrance-day-pin-uss-farragut": {
	id: "remembrance-day-pin-uss-farragut";
  collection: "related";
  data: InferEntrySchema<"related">
};
"remembrance-day-pin-uss-gallant": {
	id: "remembrance-day-pin-uss-gallant";
  collection: "related";
  data: InferEntrySchema<"related">
};
"remembrance-day-pin-uss-kongo": {
	id: "remembrance-day-pin-uss-kongo";
  collection: "related";
  data: InferEntrySchema<"related">
};
"remembrance-day-pin-uss-palenque": {
	id: "remembrance-day-pin-uss-palenque";
  collection: "related";
  data: InferEntrySchema<"related">
};
"remembrance-day-pin-uss-shenzhou": {
	id: "remembrance-day-pin-uss-shenzhou";
  collection: "related";
  data: InferEntrySchema<"related">
};
"remembrance-day-pin-uss-yangtze": {
	id: "remembrance-day-pin-uss-yangtze";
  collection: "related";
  data: InferEntrySchema<"related">
};
"retail-sign-b-qualor-ii": {
	id: "retail-sign-b-qualor-ii";
  collection: "related";
  data: InferEntrySchema<"related">
};
"retail-sign-b-qualor-ii-1": {
	id: "retail-sign-b-qualor-ii-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"retail-sign-c-qualor-ii": {
	id: "retail-sign-c-qualor-ii";
  collection: "related";
  data: InferEntrySchema<"related">
};
"rex-s-bar": {
	id: "rex-s-bar";
  collection: "related";
  data: InferEntrySchema<"related">
};
"risa": {
	id: "risa";
  collection: "related";
  data: InferEntrySchema<"related">
};
"risan-beach-resort": {
	id: "risan-beach-resort";
  collection: "related";
  data: InferEntrySchema<"related">
};
"risian-2380s": {
	id: "risian-2380s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"risian-3100s": {
	id: "risian-3100s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"risian-bar": {
	id: "risian-bar";
  collection: "related";
  data: InferEntrySchema<"related">
};
"risian-facial-mark-a": {
	id: "risian-facial-mark-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"risian-facial-mark-b": {
	id: "risian-facial-mark-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"risian-facial-mark-b-3100s": {
	id: "risian-facial-mark-b-3100s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"risian-night-club": {
	id: "risian-night-club";
  collection: "related";
  data: InferEntrySchema<"related">
};
"risian-wine": {
	id: "risian-wine";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-ale": {
	id: "romulan-ale";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-centurian": {
	id: "romulan-centurian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-diplomatic-flag": {
	id: "romulan-diplomatic-flag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-empire-2380s": {
	id: "romulan-empire-2380s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-empire-2380s-d": {
	id: "romulan-empire-2380s-d";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-free-state-a": {
	id: "romulan-free-state-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-free-state-b": {
	id: "romulan-free-state-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-free-state-flag": {
	id: "romulan-free-state-flag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-imperial-seal": {
	id: "romulan-imperial-seal";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-military-shield": {
	id: "romulan-military-shield";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-military-shield-b": {
	id: "romulan-military-shield-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-north-station-vashti-relocation-hub": {
	id: "romulan-north-station-vashti-relocation-hub";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-radiation-tag": {
	id: "romulan-radiation-tag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-rebirth-movement": {
	id: "romulan-rebirth-movement";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-rebirth-movement-comm-insignia": {
	id: "romulan-rebirth-movement-comm-insignia";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-senate-insignia": {
	id: "romulan-senate-insignia";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-social-club-vashti-relocation-hub": {
	id: "romulan-social-club-vashti-relocation-hub";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-star-empire-2150s": {
	id: "romulan-star-empire-2150s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-star-empire-2260s": {
	id: "romulan-star-empire-2260s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-star-empire-2360s": {
	id: "romulan-star-empire-2360s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-star-empire-2370s": {
	id: "romulan-star-empire-2370s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-star-empire-2380s-a": {
	id: "romulan-star-empire-2380s-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-star-empire-2380s-b": {
	id: "romulan-star-empire-2380s-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"romulan-star-empire-2380s-c": {
	id: "romulan-star-empire-2380s-c";
  collection: "related";
  data: InferEntrySchema<"related">
};
"rutia-iv": {
	id: "rutia-iv";
  collection: "related";
  data: InferEntrySchema<"related">
};
"s-k-green-stamps": {
	id: "s-k-green-stamps";
  collection: "related";
  data: InferEntrySchema<"related">
};
"s.s.conestoga": {
	id: "s.s.conestoga";
  collection: "related";
  data: InferEntrySchema<"related">
};
"safetech-industries": {
	id: "safetech-industries";
  collection: "related";
  data: InferEntrySchema<"related">
};
"sampaguita": {
	id: "sampaguita";
  collection: "related";
  data: InferEntrySchema<"related">
};
"san-francisco-air-tram": {
	id: "san-francisco-air-tram";
  collection: "related";
  data: InferEntrySchema<"related">
};
"san-francisco-sanctuary-district-a": {
	id: "san-francisco-sanctuary-district-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"sarrotheyn": {
	id: "sarrotheyn";
  collection: "related";
  data: InferEntrySchema<"related">
};
"saurian-brandy": {
	id: "saurian-brandy";
  collection: "related";
  data: InferEntrySchema<"related">
};
"saurian-brandy-2400s": {
	id: "saurian-brandy-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"schlerm": {
	id: "schlerm";
  collection: "related";
  data: InferEntrySchema<"related">
};
"scorpion-class-attack-fighter": {
	id: "scorpion-class-attack-fighter";
  collection: "related";
  data: InferEntrySchema<"related">
};
"section-31": {
	id: "section-31";
  collection: "related";
  data: InferEntrySchema<"related">
};
"self-aware-megalomaniacal-computer-a": {
	id: "self-aware-megalomaniacal-computer-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"self-aware-megalomaniacal-computer-b": {
	id: "self-aware-megalomaniacal-computer-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"self-aware-megalomaniacal-computer-c": {
	id: "self-aware-megalomaniacal-computer-c";
  collection: "related";
  data: InferEntrySchema<"related">
};
"self-aware-megalomaniacal-computer-d": {
	id: "self-aware-megalomaniacal-computer-d";
  collection: "related";
  data: InferEntrySchema<"related">
};
"self-aware-megalomaniacal-computer-e": {
	id: "self-aware-megalomaniacal-computer-e";
  collection: "related";
  data: InferEntrySchema<"related">
};
"self-aware-megalomaniacal-computer-f": {
	id: "self-aware-megalomaniacal-computer-f";
  collection: "related";
  data: InferEntrySchema<"related">
};
"self-aware-megalomaniacal-computer-g": {
	id: "self-aware-megalomaniacal-computer-g";
  collection: "related";
  data: InferEntrySchema<"related">
};
"self-aware-megalomaniacal-computer-h": {
	id: "self-aware-megalomaniacal-computer-h";
  collection: "related";
  data: InferEntrySchema<"related">
};
"self-aware-megalomaniacal-computer-storage": {
	id: "self-aware-megalomaniacal-computer-storage";
  collection: "related";
  data: InferEntrySchema<"related">
};
"sevrin-s-followers": {
	id: "sevrin-s-followers";
  collection: "related";
  data: InferEntrySchema<"related">
};
"shango-mission-patch": {
	id: "shango-mission-patch";
  collection: "related";
  data: InferEntrySchema<"related">
};
"shango-x-1": {
	id: "shango-x-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ship-directional-alphabetic": {
	id: "ship-directional-alphabetic";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ship-directional-numeric": {
	id: "ship-directional-numeric";
  collection: "related";
  data: InferEntrySchema<"related">
};
"shop-sign-a-qualor-ii": {
	id: "shop-sign-a-qualor-ii";
  collection: "related";
  data: InferEntrySchema<"related">
};
"shuttle-access": {
	id: "shuttle-access";
  collection: "related";
  data: InferEntrySchema<"related">
};
"shuttle-columbus": {
	id: "shuttle-columbus";
  collection: "related";
  data: InferEntrySchema<"related">
};
"shuttle-copernicus": {
	id: "shuttle-copernicus";
  collection: "related";
  data: InferEntrySchema<"related">
};
"shuttle-galileo-2260s": {
	id: "shuttle-galileo-2260s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"shuttle-galileo-2280s": {
	id: "shuttle-galileo-2280s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"shuttle-galileo-ii": {
	id: "shuttle-galileo-ii";
  collection: "related";
  data: InferEntrySchema<"related">
};
"sisko-s-creole-kitchen": {
	id: "sisko-s-creole-kitchen";
  collection: "related";
  data: InferEntrySchema<"related">
};
"sisko-s-creole-kitchen-1": {
	id: "sisko-s-creole-kitchen-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"skate-and-destroy": {
	id: "skate-and-destroy";
  collection: "related";
  data: InferEntrySchema<"related">
};
"skrreean": {
	id: "skrreean";
  collection: "related";
  data: InferEntrySchema<"related">
};
"slushie-bar-qualor-ii": {
	id: "slushie-bar-qualor-ii";
  collection: "related";
  data: InferEntrySchema<"related">
};
"sobras": {
	id: "sobras";
  collection: "related";
  data: InferEntrySchema<"related">
};
"son-a": {
	id: "son-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"soong-dynamics": {
	id: "soong-dynamics";
  collection: "related";
  data: InferEntrySchema<"related">
};
"space-systems-cargo-service": {
	id: "space-systems-cargo-service";
  collection: "related";
  data: InferEntrySchema<"related">
};
"spearhead-operations": {
	id: "spearhead-operations";
  collection: "related";
  data: InferEntrySchema<"related">
};
"species-8472": {
	id: "species-8472";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ss-intrepid": {
	id: "ss-intrepid";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starbase-80-crew": {
	id: "starbase-80-crew";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starbase-yorktown-kelvin": {
	id: "starbase-yorktown-kelvin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"stardust-city-reproductive-health-services": {
	id: "stardust-city-reproductive-health-services";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet": {
	id: "starfleet";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-2260-b-kelvin": {
	id: "starfleet-2260-b-kelvin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-2260s-kelvin": {
	id: "starfleet-2260s-kelvin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-2280s-informal": {
	id: "starfleet-2280s-informal";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-2360s-narenda": {
	id: "starfleet-2360s-narenda";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-2380s-informal": {
	id: "starfleet-2380s-informal";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-3100s-informal": {
	id: "starfleet-3100s-informal";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-academy": {
	id: "starfleet-academy";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-academy-2360s": {
	id: "starfleet-academy-2360s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-academy-2360s-1": {
	id: "starfleet-academy-2360s-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-academy-2360s-2": {
	id: "starfleet-academy-2360s-2";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-academy-2360s-remaster": {
	id: "starfleet-academy-2360s-remaster";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-academy-2370s-a": {
	id: "starfleet-academy-2370s-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-academy-2400s": {
	id: "starfleet-academy-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-academy-banner-2400s-a": {
	id: "starfleet-academy-banner-2400s-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-academy-banner-2400s-b": {
	id: "starfleet-academy-banner-2400s-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-academy-banner-2400s-c": {
	id: "starfleet-academy-banner-2400s-c";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-academy-flag": {
	id: "starfleet-academy-flag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-academy-flag-2400s": {
	id: "starfleet-academy-flag-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-academy-red-squadron": {
	id: "starfleet-academy-red-squadron";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-academy-red-squadron-1": {
	id: "starfleet-academy-red-squadron-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-admiral-2400s": {
	id: "starfleet-admiral-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-all-star": {
	id: "starfleet-all-star";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-banner-2260s-kelvin": {
	id: "starfleet-banner-2260s-kelvin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-barbershop": {
	id: "starfleet-barbershop";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-biomonitor": {
	id: "starfleet-biomonitor";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-cargo": {
	id: "starfleet-cargo";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-cargo-1": {
	id: "starfleet-cargo-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-comm-array-uss-cerritos": {
	id: "starfleet-comm-array-uss-cerritos";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-2250s": {
	id: "starfleet-command-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-2260s": {
	id: "starfleet-command-2260s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-2260s-kelvin": {
	id: "starfleet-command-2260s-kelvin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-2270s": {
	id: "starfleet-command-2270s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-2370s": {
	id: "starfleet-command-2370s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-2390s": {
	id: "starfleet-command-2390s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-2400s-b": {
	id: "starfleet-command-2400s-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-banner-2400s": {
	id: "starfleet-command-banner-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-banner-2400s-b": {
	id: "starfleet-command-banner-2400s-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-buckle": {
	id: "starfleet-command-buckle";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-flag": {
	id: "starfleet-command-flag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-flag-2370s-a": {
	id: "starfleet-command-flag-2370s-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-flag-2370s-a-1": {
	id: "starfleet-command-flag-2370s-a-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-flag-2370s-a-2": {
	id: "starfleet-command-flag-2370s-a-2";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-flag-2400s": {
	id: "starfleet-command-flag-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-formal-insignia-2260s-kelvin": {
	id: "starfleet-command-formal-insignia-2260s-kelvin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-insignia-2260s-kelvin": {
	id: "starfleet-command-insignia-2260s-kelvin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-judge-advocate-generals-office-a": {
	id: "starfleet-command-judge-advocate-generals-office-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-judge-advocate-generals-office-b": {
	id: "starfleet-command-judge-advocate-generals-office-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-seal-2400s": {
	id: "starfleet-command-seal-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-command-training-program": {
	id: "starfleet-command-training-program";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew": {
	id: "starfleet-crew";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-1": {
	id: "starfleet-crew-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-2360s": {
	id: "starfleet-crew-2360s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-2370s": {
	id: "starfleet-crew-2370s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-2380s": {
	id: "starfleet-crew-2380s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-2390s": {
	id: "starfleet-crew-2390s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-acting-ensign": {
	id: "starfleet-crew-acting-ensign";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-admiral-2250s": {
	id: "starfleet-crew-admiral-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-admiral-2390s": {
	id: "starfleet-crew-admiral-2390s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-admiral-baresh-sim": {
	id: "starfleet-crew-admiral-baresh-sim";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-admiral-baresh-sim-1": {
	id: "starfleet-crew-admiral-baresh-sim-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-captain-baresh-sim": {
	id: "starfleet-crew-captain-baresh-sim";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-command-2260s-kelvin": {
	id: "starfleet-crew-command-2260s-kelvin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-command-2270s": {
	id: "starfleet-crew-command-2270s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-command-2270s-1": {
	id: "starfleet-crew-command-2270s-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-command-captain-2250s": {
	id: "starfleet-crew-command-captain-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-command-captain-2250s-1": {
	id: "starfleet-crew-command-captain-2250s-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-command-captain-2250s-2": {
	id: "starfleet-crew-command-captain-2250s-2";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-command-commander-2250s": {
	id: "starfleet-crew-command-commander-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-commander-baresh-sim": {
	id: "starfleet-crew-commander-baresh-sim";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-engineering-2260s-kelvin": {
	id: "starfleet-crew-engineering-2260s-kelvin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-engineering-2270s": {
	id: "starfleet-crew-engineering-2270s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-engineering-2270s-1": {
	id: "starfleet-crew-engineering-2270s-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-formal-insignia-2260s-kelvin": {
	id: "starfleet-crew-formal-insignia-2260s-kelvin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-formal-insignia-2270s": {
	id: "starfleet-crew-formal-insignia-2270s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-lieutenant-baresh-sim": {
	id: "starfleet-crew-lieutenant-baresh-sim";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-lt-commander-baresh-sim": {
	id: "starfleet-crew-lt-commander-baresh-sim";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-medical-2260s-kelvin": {
	id: "starfleet-crew-medical-2260s-kelvin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-medical-2270s": {
	id: "starfleet-crew-medical-2270s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-medical-ensign-2250s": {
	id: "starfleet-crew-medical-ensign-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-medical-lieutenent-2250s": {
	id: "starfleet-crew-medical-lieutenent-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-operations-cadet-2250s": {
	id: "starfleet-crew-operations-cadet-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-operations-cadet-2250s-1": {
	id: "starfleet-crew-operations-cadet-2250s-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-operations-ensign-2250s": {
	id: "starfleet-crew-operations-ensign-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-operations-ensign-2250s-1": {
	id: "starfleet-crew-operations-ensign-2250s-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-operations-ensign-2250s-2": {
	id: "starfleet-crew-operations-ensign-2250s-2";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-sciences-2260s-kelvin": {
	id: "starfleet-crew-sciences-2260s-kelvin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-sciences-2270s": {
	id: "starfleet-crew-sciences-2270s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-sciences-commander-2250s": {
	id: "starfleet-crew-sciences-commander-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-sciences-commander-2250s-1": {
	id: "starfleet-crew-sciences-commander-2250s-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-sciences-commander-2250s-2": {
	id: "starfleet-crew-sciences-commander-2250s-2";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-sciences-ensign-2250s": {
	id: "starfleet-crew-sciences-ensign-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-security-service-ops-2270s": {
	id: "starfleet-crew-security-service-ops-2270s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-security-service-ops-2270s-1": {
	id: "starfleet-crew-security-service-ops-2270s-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-tricom-admiral": {
	id: "starfleet-crew-tricom-admiral";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-tricom-captain": {
	id: "starfleet-crew-tricom-captain";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-tricom-commander": {
	id: "starfleet-crew-tricom-commander";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-tricom-ensign": {
	id: "starfleet-crew-tricom-ensign";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-tricom-lieutenant": {
	id: "starfleet-crew-tricom-lieutenant";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-tricom-lieutenant-jr.grade": {
	id: "starfleet-crew-tricom-lieutenant-jr.grade";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-crew-vice-admiral-2250s": {
	id: "starfleet-crew-vice-admiral-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-dog-tag": {
	id: "starfleet-dog-tag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-engineering-division": {
	id: "starfleet-engineering-division";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-environmental-systems-division": {
	id: "starfleet-environmental-systems-division";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-fleet-captain-insignia-2250s": {
	id: "starfleet-fleet-captain-insignia-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-general-ship-medical": {
	id: "starfleet-general-ship-medical";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-hat-badge-kelvin": {
	id: "starfleet-hat-badge-kelvin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-headquarters": {
	id: "starfleet-headquarters";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-headquarters-2270s": {
	id: "starfleet-headquarters-2270s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-headquarters-2280s": {
	id: "starfleet-headquarters-2280s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-headquarters-2390s": {
	id: "starfleet-headquarters-2390s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-headquarters-banner": {
	id: "starfleet-headquarters-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-hold-locator": {
	id: "starfleet-hold-locator";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-informal-2400s": {
	id: "starfleet-informal-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-informal-b-2380s": {
	id: "starfleet-informal-b-2380s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-informal-c-2380s": {
	id: "starfleet-informal-c-2380s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-intelligence-temporal-transmitter": {
	id: "starfleet-intelligence-temporal-transmitter";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-materiel-supply-command-label": {
	id: "starfleet-materiel-supply-command-label";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-medical": {
	id: "starfleet-medical";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-medical-2250s": {
	id: "starfleet-medical-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-medical-2280s-a": {
	id: "starfleet-medical-2280s-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-medical-2280s-b": {
	id: "starfleet-medical-2280s-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-medical-2370s": {
	id: "starfleet-medical-2370s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-medical-2370s-a": {
	id: "starfleet-medical-2370s-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-medical-2380s": {
	id: "starfleet-medical-2380s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-medical-2380s-c": {
	id: "starfleet-medical-2380s-c";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-medical-2380s-d": {
	id: "starfleet-medical-2380s-d";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-medical-2400s": {
	id: "starfleet-medical-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-medical-bay": {
	id: "starfleet-medical-bay";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-medical-cargo-label": {
	id: "starfleet-medical-cargo-label";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-medical-infirmary": {
	id: "starfleet-medical-infirmary";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-medical-personnel": {
	id: "starfleet-medical-personnel";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-merch-2260s": {
	id: "starfleet-merch-2260s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-mission-control": {
	id: "starfleet-mission-control";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-mission-operations": {
	id: "starfleet-mission-operations";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-museum": {
	id: "starfleet-museum";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-museum-quantum-archives": {
	id: "starfleet-museum-quantum-archives";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-outpost-crew": {
	id: "starfleet-outpost-crew";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-outpost-crew-2250s": {
	id: "starfleet-outpost-crew-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-padd": {
	id: "starfleet-padd";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-pennant": {
	id: "starfleet-pennant";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-rehabilitation": {
	id: "starfleet-rehabilitation";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-repair-division": {
	id: "starfleet-repair-division";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-research-center": {
	id: "starfleet-research-center";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-science": {
	id: "starfleet-science";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-sciences-division": {
	id: "starfleet-sciences-division";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-security-division": {
	id: "starfleet-security-division";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-security-division-1": {
	id: "starfleet-security-division-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-security-division-2": {
	id: "starfleet-security-division-2";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-security-division-2400": {
	id: "starfleet-security-division-2400";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-security-sol-sector": {
	id: "starfleet-security-sol-sector";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-shipyard-kelvin": {
	id: "starfleet-shipyard-kelvin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-synth": {
	id: "starfleet-synth";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-tactical-delta": {
	id: "starfleet-tactical-delta";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-vaccine-supplies": {
	id: "starfleet-vaccine-supplies";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleet-visitor-badge": {
	id: "starfleet-visitor-badge";
  collection: "related";
  data: InferEntrySchema<"related">
};
"starfleets-shame": {
	id: "starfleets-shame";
  collection: "related";
  data: InferEntrySchema<"related">
};
"storm-alert": {
	id: "storm-alert";
  collection: "related";
  data: InferEntrySchema<"related">
};
"streetfighting-sim-sign-a": {
	id: "streetfighting-sim-sign-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"streetfighting-sim-sign-b": {
	id: "streetfighting-sim-sign-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"streetfighting-sim-sign-c": {
	id: "streetfighting-sim-sign-c";
  collection: "related";
  data: InferEntrySchema<"related">
};
"streetfighting-sim-sign-d": {
	id: "streetfighting-sim-sign-d";
  collection: "related";
  data: InferEntrySchema<"related">
};
"suliban": {
	id: "suliban";
  collection: "related";
  data: InferEntrySchema<"related">
};
"sunland-moving-hauling": {
	id: "sunland-moving-hauling";
  collection: "related";
  data: InferEntrySchema<"related">
};
"sunshine-radio-system": {
	id: "sunshine-radio-system";
  collection: "related";
  data: InferEntrySchema<"related">
};
"syrup-of-squill": {
	id: "syrup-of-squill";
  collection: "related";
  data: InferEntrySchema<"related">
};
"t-lani": {
	id: "t-lani";
  collection: "related";
  data: InferEntrySchema<"related">
};
"table-tennis": {
	id: "table-tennis";
  collection: "related";
  data: InferEntrySchema<"related">
};
"takret-militia": {
	id: "takret-militia";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tal-shiar": {
	id: "tal-shiar";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tal-shiar-communicator-insignia": {
	id: "tal-shiar-communicator-insignia";
  collection: "related";
  data: InferEntrySchema<"related">
};
"talarian": {
	id: "talarian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"talaxian": {
	id: "talaxian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"talaxian-a": {
	id: "talaxian-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"talaxian-a2": {
	id: "talaxian-a2";
  collection: "related";
  data: InferEntrySchema<"related">
};
"talaxian-a3": {
	id: "talaxian-a3";
  collection: "related";
  data: InferEntrySchema<"related">
};
"talosian": {
	id: "talosian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"talosian-a-talos-iv": {
	id: "talosian-a-talos-iv";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tamarian-mead": {
	id: "tamarian-mead";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tandaran": {
	id: "tandaran";
  collection: "related";
  data: InferEntrySchema<"related">
};
"taresian": {
	id: "taresian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tarquin-s-mandala": {
	id: "tarquin-s-mandala";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tars-lamora-cargo-label": {
	id: "tars-lamora-cargo-label";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tau-cygna-v": {
	id: "tau-cygna-v";
  collection: "related";
  data: InferEntrySchema<"related">
};
"technology-future": {
	id: "technology-future";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tellarite": {
	id: "tellarite";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tellarite-2380s": {
	id: "tellarite-2380s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tellarite-flag": {
	id: "tellarite-flag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"telluridian-synthale": {
	id: "telluridian-synthale";
  collection: "related";
  data: InferEntrySchema<"related">
};
"temporal-integrity-commission": {
	id: "temporal-integrity-commission";
  collection: "related";
  data: InferEntrySchema<"related">
};
"teplan": {
	id: "teplan";
  collection: "related";
  data: InferEntrySchema<"related">
};
"terra-prime": {
	id: "terra-prime";
  collection: "related";
  data: InferEntrySchema<"related">
};
"terran-banner": {
	id: "terran-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"terran-crew-2260s": {
	id: "terran-crew-2260s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"terran-empire": {
	id: "terran-empire";
  collection: "related";
  data: InferEntrySchema<"related">
};
"terran-empire-2250s": {
	id: "terran-empire-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"terran-empire-2260s": {
	id: "terran-empire-2260s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"terran-empire-2380s": {
	id: "terran-empire-2380s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"terran-flag": {
	id: "terran-flag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"terran-resistance-2250s": {
	id: "terran-resistance-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"terran-resistance-2370s": {
	id: "terran-resistance-2370s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"terran-seal-2250s": {
	id: "terran-seal-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"test-point": {
	id: "test-point";
  collection: "related";
  data: InferEntrySchema<"related">
};
"test-symbol": {
	id: "test-symbol";
  collection: "related";
  data: InferEntrySchema<"related">
};
"the-dominion": {
	id: "the-dominion";
  collection: "related";
  data: InferEntrySchema<"related">
};
"the-key-club": {
	id: "the-key-club";
  collection: "related";
  data: InferEntrySchema<"related">
};
"the-lucky-ferengi": {
	id: "the-lucky-ferengi";
  collection: "related";
  data: InferEntrySchema<"related">
};
"the-many-and-the-one": {
	id: "the-many-and-the-one";
  collection: "related";
  data: InferEntrySchema<"related">
};
"the-new-q": {
	id: "the-new-q";
  collection: "related";
  data: InferEntrySchema<"related">
};
"the-old-q": {
	id: "the-old-q";
  collection: "related";
  data: InferEntrySchema<"related">
};
"the-pallid-son": {
	id: "the-pallid-son";
  collection: "related";
  data: InferEntrySchema<"related">
};
"the-red-bolian": {
	id: "the-red-bolian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"the-royale-theta-116": {
	id: "the-royale-theta-116";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tholian-assembly": {
	id: "tholian-assembly";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tigan-pergium-mining": {
	id: "tigan-pergium-mining";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tipton-bros.deli": {
	id: "tipton-bros.deli";
  collection: "related";
  data: InferEntrySchema<"related">
};
"titan-raider-wen": {
	id: "titan-raider-wen";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tkon-empire": {
	id: "tkon-empire";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tongo-card-sample": {
	id: "tongo-card-sample";
  collection: "related";
  data: InferEntrySchema<"related">
};
"trans-francisco-2370s": {
	id: "trans-francisco-2370s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"transfrancisco": {
	id: "transfrancisco";
  collection: "related";
  data: InferEntrySchema<"related">
};
"transporter-systems": {
	id: "transporter-systems";
  collection: "related";
  data: InferEntrySchema<"related">
};
"transwormhole-freight": {
	id: "transwormhole-freight";
  collection: "related";
  data: InferEntrySchema<"related">
};
"triannon": {
	id: "triannon";
  collection: "related";
  data: InferEntrySchema<"related">
};
"triglobulin-harvester": {
	id: "triglobulin-harvester";
  collection: "related";
  data: InferEntrySchema<"related">
};
"trill": {
	id: "trill";
  collection: "related";
  data: InferEntrySchema<"related">
};
"trill-2400s": {
	id: "trill-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"trill-3100s": {
	id: "trill-3100s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"trill-flag-2400s": {
	id: "trill-flag-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"trill-science-ministry": {
	id: "trill-science-ministry";
  collection: "related";
  data: InferEntrySchema<"related">
};
"trill-symbiosis-commission": {
	id: "trill-symbiosis-commission";
  collection: "related";
  data: InferEntrySchema<"related">
};
"triskelion": {
	id: "triskelion";
  collection: "related";
  data: InferEntrySchema<"related">
};
"triskelion-cargo-label": {
	id: "triskelion-cargo-label";
  collection: "related";
  data: InferEntrySchema<"related">
};
"triskelion-flag": {
	id: "triskelion-flag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"trixian-bubble-juice": {
	id: "trixian-bubble-juice";
  collection: "related";
  data: InferEntrySchema<"related">
};
"truth-society": {
	id: "truth-society";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tsunkatse-games": {
	id: "tsunkatse-games";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tsunkatse-games-banner": {
	id: "tsunkatse-games-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tsunkatse-games-informal": {
	id: "tsunkatse-games-informal";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tulgana-iv-museum-of-antiquities-banner-a": {
	id: "tulgana-iv-museum-of-antiquities-banner-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tulgana-iv-museum-of-antiquities-banner-b": {
	id: "tulgana-iv-museum-of-antiquities-banner-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tycho-base": {
	id: "tycho-base";
  collection: "related";
  data: InferEntrySchema<"related">
};
"tyran": {
	id: "tyran";
  collection: "related";
  data: InferEntrySchema<"related">
};
"u.s.s.cerritos-bar": {
	id: "u.s.s.cerritos-bar";
  collection: "related";
  data: InferEntrySchema<"related">
};
"u.s.s.discovery-seal-3100s": {
	id: "u.s.s.discovery-seal-3100s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"u.s.s.hiawatha-seal": {
	id: "u.s.s.hiawatha-seal";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ufp-diplomatic-insignia": {
	id: "ufp-diplomatic-insignia";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ufp-flag-2380s": {
	id: "ufp-flag-2380s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ufp-office-of-the-president": {
	id: "ufp-office-of-the-president";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ufp-office-of-the-president-2370s": {
	id: "ufp-office-of-the-president-2370s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ufp-pennant": {
	id: "ufp-pennant";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ufp-pennant-2370s": {
	id: "ufp-pennant-2370s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ufp-romulan-medical-conference-banner-romulan": {
	id: "ufp-romulan-medical-conference-banner-romulan";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ufp-romulan-medical-conference-banner-romulan-alt": {
	id: "ufp-romulan-medical-conference-banner-romulan-alt";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-earth": {
	id: "united-earth";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-earth-2380s": {
	id: "united-earth-2380s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-earth-2400s": {
	id: "united-earth-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-earth-3100s": {
	id: "united-earth-3100s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-earth-and-titan": {
	id: "united-earth-and-titan";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-earth-defense-force": {
	id: "united-earth-defense-force";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-earth-diplomatic-corps": {
	id: "united-earth-diplomatic-corps";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-earth-flag": {
	id: "united-earth-flag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-earth-flag-2400s": {
	id: "united-earth-flag-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-earth-space-probe-agency": {
	id: "united-earth-space-probe-agency";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-earth-starfleet-command": {
	id: "united-earth-starfleet-command";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-earth-starfleet-command-flag": {
	id: "united-earth-starfleet-command-flag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-earth-starfleet-command-flag-b": {
	id: "united-earth-starfleet-command-flag-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-earth-starfleet-command-seal": {
	id: "united-earth-starfleet-command-seal";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-earth-starfleet-flag": {
	id: "united-earth-starfleet-flag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-earth-vessel-enterprise": {
	id: "united-earth-vessel-enterprise";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets": {
	id: "united-federation-of-planets";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-1": {
	id: "united-federation-of-planets-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-paris-site": {
	id: "united-federation-of-planets-paris-site";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-2250s": {
	id: "united-federation-of-planets-ufp-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-2260s-kelvin": {
	id: "united-federation-of-planets-ufp-2260s-kelvin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-2270s": {
	id: "united-federation-of-planets-ufp-2270s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-2280s-a": {
	id: "united-federation-of-planets-ufp-2280s-a";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-2280s-a-1": {
	id: "united-federation-of-planets-ufp-2280s-a-1";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-2370s": {
	id: "united-federation-of-planets-ufp-2370s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-2370s-b": {
	id: "united-federation-of-planets-ufp-2370s-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-2390s": {
	id: "united-federation-of-planets-ufp-2390s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-2400s": {
	id: "united-federation-of-planets-ufp-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-banner-2370s-b": {
	id: "united-federation-of-planets-ufp-banner-2370s-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-banner-3100s": {
	id: "united-federation-of-planets-ufp-banner-3100s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-diplomatic-insignia": {
	id: "united-federation-of-planets-ufp-diplomatic-insignia";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-flag-2260s-a-kelvin": {
	id: "united-federation-of-planets-ufp-flag-2260s-a-kelvin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-flag-2260s-b-kelvin": {
	id: "united-federation-of-planets-ufp-flag-2260s-b-kelvin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-flag-2280s": {
	id: "united-federation-of-planets-ufp-flag-2280s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-flag-2370s": {
	id: "united-federation-of-planets-ufp-flag-2370s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-flag-2370s-b": {
	id: "united-federation-of-planets-ufp-flag-2370s-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-flag-2400s": {
	id: "united-federation-of-planets-ufp-flag-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-insignia-3100s": {
	id: "united-federation-of-planets-ufp-insignia-3100s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-khitomer-banner": {
	id: "united-federation-of-planets-ufp-khitomer-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-khitomer-flag": {
	id: "united-federation-of-planets-ufp-khitomer-flag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-pennant-2280s": {
	id: "united-federation-of-planets-ufp-pennant-2280s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-press-and-information": {
	id: "united-federation-of-planets-ufp-press-and-information";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-promenade-banner": {
	id: "united-federation-of-planets-ufp-promenade-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-federation-of-planets-ufp-seal-3100s": {
	id: "united-federation-of-planets-ufp-seal-3100s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"united-planets-of-61-cygni": {
	id: "united-planets-of-61-cygni";
  collection: "related";
  data: InferEntrySchema<"related">
};
"uss-arledo-danger-alert": {
	id: "uss-arledo-danger-alert";
  collection: "related";
  data: InferEntrySchema<"related">
};
"uss-discovery-tactical-seal-3100s": {
	id: "uss-discovery-tactical-seal-3100s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"uss-enterprise-seal-2250s": {
	id: "uss-enterprise-seal-2250s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"uss-protostar-crew": {
	id: "uss-protostar-crew";
  collection: "related";
  data: InferEntrySchema<"related">
};
"uss-protostar-seal": {
	id: "uss-protostar-seal";
  collection: "related";
  data: InferEntrySchema<"related">
};
"utopia-planitia-shipyards": {
	id: "utopia-planitia-shipyards";
  collection: "related";
  data: InferEntrySchema<"related">
};
"uxal": {
	id: "uxal";
  collection: "related";
  data: InferEntrySchema<"related">
};
"v-shar": {
	id: "v-shar";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vaadwaur": {
	id: "vaadwaur";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vaal-gamma-trianguli-vi": {
	id: "vaal-gamma-trianguli-vi";
  collection: "related";
  data: InferEntrySchema<"related">
};
"valakian": {
	id: "valakian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vendala": {
	id: "vendala";
  collection: "related";
  data: InferEntrySchema<"related">
};
"ventaxian": {
	id: "ventaxian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vic-fontaine": {
	id: "vic-fontaine";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vic-fontaine-2380s": {
	id: "vic-fontaine-2380s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vidiian": {
	id: "vidiian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vidiian-b": {
	id: "vidiian-b";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vidiian-c": {
	id: "vidiian-c";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vissian": {
	id: "vissian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"volan-iii": {
	id: "volan-iii";
  collection: "related";
  data: InferEntrySchema<"related">
};
"volleyball-court": {
	id: "volleyball-court";
  collection: "related";
  data: InferEntrySchema<"related">
};
"voth": {
	id: "voth";
  collection: "related";
  data: InferEntrySchema<"related">
};
"voyager-collector-plate-tom-paris": {
	id: "voyager-collector-plate-tom-paris";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vulcan-2400s": {
	id: "vulcan-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vulcan-banner": {
	id: "vulcan-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vulcan-flag-2400s": {
	id: "vulcan-flag-2400s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vulcan-gaurd": {
	id: "vulcan-gaurd";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vulcan-idic-2150s": {
	id: "vulcan-idic-2150s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vulcan-idic-2370s": {
	id: "vulcan-idic-2370s";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vulcan-khitomer-banner": {
	id: "vulcan-khitomer-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vulcan-khitomer-flag": {
	id: "vulcan-khitomer-flag";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vulcan-logicians": {
	id: "vulcan-logicians";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vulcan-port": {
	id: "vulcan-port";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vulcan-science-academy-vsa": {
	id: "vulcan-science-academy-vsa";
  collection: "related";
  data: InferEntrySchema<"related">
};
"vulcan-space-command": {
	id: "vulcan-space-command";
  collection: "related";
  data: InferEntrySchema<"related">
};
"wadi-door-access": {
	id: "wadi-door-access";
  collection: "related";
  data: InferEntrySchema<"related">
};
"water-ration": {
	id: "water-ration";
  collection: "related";
  data: InferEntrySchema<"related">
};
"widin-dairy-farm": {
	id: "widin-dairy-farm";
  collection: "related";
  data: InferEntrySchema<"related">
};
"wormhole-comm-relay-station": {
	id: "wormhole-comm-relay-station";
  collection: "related";
  data: InferEntrySchema<"related">
};
"wsa-primary-school": {
	id: "wsa-primary-school";
  collection: "related";
  data: InferEntrySchema<"related">
};
"xanthan-concubine-sales": {
	id: "xanthan-concubine-sales";
  collection: "related";
  data: InferEntrySchema<"related">
};
"xanthan-concubine-tag-rajiin": {
	id: "xanthan-concubine-tag-rajiin";
  collection: "related";
  data: InferEntrySchema<"related">
};
"xanthan-marketplace-banner": {
	id: "xanthan-marketplace-banner";
  collection: "related";
  data: InferEntrySchema<"related">
};
"xindi": {
	id: "xindi";
  collection: "related";
  data: InferEntrySchema<"related">
};
"xindi-council": {
	id: "xindi-council";
  collection: "related";
  data: InferEntrySchema<"related">
};
"xindi-insectoid": {
	id: "xindi-insectoid";
  collection: "related";
  data: InferEntrySchema<"related">
};
"xyrillian": {
	id: "xyrillian";
  collection: "related";
  data: InferEntrySchema<"related">
};
"yaderan": {
	id: "yaderan";
  collection: "related";
  data: InferEntrySchema<"related">
};
"yellow-alert": {
	id: "yellow-alert";
  collection: "related";
  data: InferEntrySchema<"related">
};
"zakdorn": {
	id: "zakdorn";
  collection: "related";
  data: InferEntrySchema<"related">
};
"zebulon-sisters": {
	id: "zebulon-sisters";
  collection: "related";
  data: InferEntrySchema<"related">
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
