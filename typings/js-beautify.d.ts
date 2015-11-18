declare module "js-beautify" {
	
	interface IBeautifyCSSOptions {
		indent_size?: number; // (4) — indentation size,
		indent_char?: string; // (space) — character to indent with,
		selector_separator_newline?: boolean; // (true) - separate selectors with newline or not (e.g. "a,\nbr" or "a, br")
		end_with_newline?: boolean; // (false) - end with a newline
		newline_between_rules?: boolean; // (true) - add a new line after every css rule
	}
	
	interface IBeautifyCSS {
		(value:string, options:IBeautifyCSSOptions): string;
	}
	
	export var css_beautify:IBeautifyCSS;	
}

