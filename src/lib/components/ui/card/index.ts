import Root from "./card.svelte";
import Content from "./card-content.svelte";
import Description from "./card-description.svelte";
import Footer from "./card-footer.svelte";
import Header from "./card-header.svelte";
import Title from "./card-title.svelte";
import Action from "./card-action.svelte"; // <-- Import the new component

export {
	Root,
	Content,
	Description,
	Footer,
	Header,
	Title,
	Action, // <-- Export the new component
	//
	Root as Card,
	Content as CardContent,
	Description as CardDescription,
	Footer as CardFooter,
	Header as CardHeader,
	Title as CardTitle,
	Action as CardAction, // <-- Export the new component with alias
};
