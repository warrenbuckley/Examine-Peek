# Examine Peek

> [!WARNING]
> As Umbraco V14 is still in a BETA phase, to install this Nuget Package into your Umbraco site, you will need to have the Umbraco MyGet feed added to your Nuget Feed
>
> `dotnet nuget add source "https://www.myget.org/F/umbracoprereleases/api/v3/index.json" -n "Umbraco Prereleases"`

## What is Examine Peek ?
It is a simple package to help view a specific [Umbraco](https://docs.umbraco.com/) content node and see its stored values in the [Umbraco External Examine index](https://docs.umbraco.com/umbraco-cms/reference/searching/examine) and was a good first use case of learning how to build a simple Umbraco package for V14.

### Why?
Well if you use Examine and are storing custom fields and values against your content node in the Umbraco External index, you may wish to quickly view and debug what is stored in the Examine index.
This saves you browsing to the Settings -> Examine dashboard and performing a search query to find the exact document you wish to view

### How do I use it?
After installation then all Umbraco content nodes will add a new `Context Action` on the right click of the tree or the actions menu.
