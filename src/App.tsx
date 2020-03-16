import React from "react";
import { ClientApplication } from "@shopify/app-bridge";
import { Page, Card, Button } from "@shopify/polaris";

import {
  TitleBar,
  ContextualSaveBar,
  ResourcePicker,
  Loading,
  Modal,
  Toast
} from "@shopify/app-bridge/actions";

export const App: React.FC<{ app: ClientApplication<unknown> }> = ({ app }) => {
  // TitleBar
  const updateTitleBar = () => {
     const titleBarOptions = {
       title: "App Bridge Sampler"
     };
    TitleBar.create(app, titleBarOptions);
  };

  // ContextualSaveBar
  const options = {
    saveAction: {
      disabled: false,
      loading: false
    },
    discardAction: {
      disabled: false,
      loading: false
    }
  };
  const contextualSaveBar = ContextualSaveBar.create(app, options);

  const showContextualSaveBar = () => {
    contextualSaveBar.dispatch(ContextualSaveBar.Action.SHOW);
  };

  contextualSaveBar.subscribe(ContextualSaveBar.Action.DISCARD, () => {
    console.log("Clicked discard button");
    contextualSaveBar.dispatch(ContextualSaveBar.Action.HIDE);
  });

  contextualSaveBar.subscribe(ContextualSaveBar.Action.SAVE, () => {
    console.log("Clicked save button");
    contextualSaveBar.dispatch(ContextualSaveBar.Action.HIDE);
  });

  // ResourcePicker
  const productPicker = ResourcePicker.create(app, {
    resourceType: ResourcePicker.ResourceType.Product
  });
  const openProductPicker = () => {
    productPicker.dispatch(ResourcePicker.Action.OPEN);
  };

  const productVariantPicker = ResourcePicker.create(app, {
    resourceType: ResourcePicker.ResourceType.ProductVariant
  });
  const openProductVariantPicker = () => {
    productVariantPicker.dispatch(ResourcePicker.Action.OPEN);
  };

  const collectionPicker = ResourcePicker.create(app, {
    resourceType: ResourcePicker.ResourceType.Collection
  });
  const openCollectionPicker = () => {
    collectionPicker.dispatch(ResourcePicker.Action.OPEN);
  };

  // Features
  const showFeatures = () => {
    app.featuresAvailable().then(state => {
      console.log(state);
    });
  };

  // Loading
  const loading = Loading.create(app);

  const startLoading = () => {
    loading.dispatch(Loading.Action.START);
  };

  const stopLoading = () => {
    loading.dispatch(Loading.Action.STOP);
  };

  // Modal
  const modalOptions = {
    title: 'Title',
    message: "Message",
  };
  const modal = Modal.create(app, modalOptions);
  const openModal = () => {
    modal.dispatch(Modal.Action.OPEN);
  };
  modal.subscribe(Modal.Action.CLOSE, () => {
    console.log("Closed modal");
  });

  // Toast
  const toastOptions = {
    message: "Message",
    duration: 5000
  };
  const toast = Toast.create(app, toastOptions);
  const showToast = () => {
    toast.dispatch(Toast.Action.SHOW);
  }

  return (
    <Page narrowWidth title="App Bridge Sampler">
      <Card title="TitleBar" sectioned>
        <Button onClick={updateTitleBar} primary>
          Update
        </Button>
      </Card>

      <Card title="ContextualSaveBar" sectioned>
        <Button onClick={showContextualSaveBar} primary>
          Show
        </Button>
      </Card>

      <Card title="ResourcePicker" sectioned>
        <Button onClick={openProductPicker} primary>
          Open (for product)
        </Button>

        <Button onClick={openProductVariantPicker} primary>
          Open (for variant)
        </Button>
 
        <Button onClick={openCollectionPicker} primary>
          Open (for collection)
        </Button>
      </Card>

      <Card title="Features" sectioned>
        <Button onClick={showFeatures} primary>
          Show (Just console)
        </Button>
      </Card>

      <Card title="Loading" sectioned>
        <Button onClick={startLoading} primary>
          Start
        </Button>

        <Button onClick={stopLoading} primary>
          Stop
        </Button>
      </Card>

      <Card title="Modal" sectioned>
        <Button onClick={openModal} primary>
          Open
        </Button>
      </Card>

      <Card title="Toast" sectioned>
        <Button onClick={showToast} primary>
          Show
        </Button>
      </Card>
    </Page>
  );
};
