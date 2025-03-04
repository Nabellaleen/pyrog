import * as React from "react";
import { Button, MenuItem, Intent, Position } from "@blueprintjs/core";
import { Select, ItemPredicate, ItemRenderer } from "@blueprintjs/select";
import { IconName } from "@blueprintjs/icons";

import TSelect from "./TSelect";

interface IResource {
  id: string;
  name: string;
}

interface ISelectProps {
  disabled?: boolean;
  icon?: IconName;
  inputItem: IResource;
  intent?: Intent;
  items: IResource[];
  loading?: boolean;
  onChange: any;
}

export default class ResourceSelect extends React.Component<ISelectProps, any> {
  private renderItem: ItemRenderer<IResource> = (
    resource: IResource,
    { handleClick, modifiers, query }
  ) => {
    return (
      <MenuItem key={resource.id} onClick={handleClick} text={resource.name} />
    );
  };

  private filterByName: ItemPredicate<IResource> = (
    query,
    resource: IResource
  ) => {
    return `${resource.name.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0;
  };

  private displayItem = function(resource: IResource): string {
    return resource.name ? resource.name : "None";
  };

  public render() {
    const {
      disabled,
      icon,
      inputItem,
      intent,
      items,
      loading,
      onChange
    } = this.props;

    return (
      <TSelect<IResource>
        disabled={disabled}
        displayItem={this.displayItem}
        filterItems={this.filterByName}
        loading={loading}
        icon={icon}
        inputItem={inputItem}
        intent={intent}
        items={items}
        onChange={onChange}
        popoverProps={{
          autoFocus: true,
          boundary: "viewport",
          canEscapeKeyClose: true,
          lazy: true,
          position: Position.RIGHT_BOTTOM,
          usePortal: true
        }}
        renderItem={this.renderItem}
      />
    );
  }
}
