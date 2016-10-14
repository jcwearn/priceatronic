DATE=$(date +%s)
FILE=priceatronic-$DATE.tar.gz
EXCLUDE="./node_modules"
EXCLUDE2="*.tar.gz"
EXCLUDE3="./.git"
APPLICATION_NAME=priceatronic
DEPLOYMENT_GROUP_NAME=priceatronic_deployment
BUCKET=priceatronic

if [ ! -f ./package.json ]; then
    echo "You must run this script from the project's root directory"
else
    if [ ! $(command -v gtar) ]; then
        echo "Install the gnu version of tar to use this utility"
        echo "brew install gnu-tar"
    else
        echo "============================================="
        echo "==== PACKAGING $FILE ===="
        echo "============================================="
        gtar zcvf $FILE --exclude=$EXCLUDE --exclude=$EXCLUDE2 --exclude=$EXCLUDE3 ./
        echo "============================================="
        echo "==== DEPLOYING $FILE ===="
        echo "============================================="
        aws s3 cp $FILE s3://$BUCKET/deployments/
        aws deploy create-deployment  --application-name $APPLICATION_NAME --region=us-east-1 --deployment-group-name $DEPLOYMENT_GROUP_NAME --s3-location bucket=$BUCKET,bundleType=tgz,key=deployments/$FILE
        rm -rf $FILE
    fi
fi
